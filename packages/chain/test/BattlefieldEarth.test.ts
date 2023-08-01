import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { BigNumber, BigNumberish } from 'ethers';
import { PromiseOrValue } from '../typechain/common';

const FUEL_ID = 1;
const REWARD_ID = 100;
const ALIEN_ID = 4;

type Alien = {
  tokenId: BigNumber;
  owner: string;
  strength: BigNumber;
  rewardsGiven: BigNumber;
};

// Needed for Chainlink mocks
const keyHash =
  '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc';

const getDeployedContract = async (name: string) => {
  const ContractFactory = await ethers.getContractFactory(name);
  const deployedContract = await ContractFactory.deploy();
  await deployedContract.deployed();
  return deployedContract;
};

describe('Battlefield Earth', function () {
  async function deployBattlefieldEarthFixture() {
    const [owner, player1, player2] = await ethers.getSigners();

    // Deploy contracts
    const coordinatorFactory = await ethers.getContractFactory(
      'VRFCoordinatorV2Mock',
      owner
    );
    const coordinator = await coordinatorFactory.deploy(
      ethers.BigNumber.from('100000000000000000'), // 0.1,
      1e9 // 0.000000001 LINK per gas
    );

    const linkEthFeedFactory = await ethers.getContractFactory(
      'MockV3Aggregator',
      owner
    );
    const linkEthFeed = await linkEthFeedFactory.deploy(
      18,
      ethers.BigNumber.from('3000000000000000') // 0.003); // 1 LINK = 0.003 ETH
    );

    const linkFactory = await ethers.getContractFactory('LinkToken', owner);
    const link = await linkFactory.deploy();

    const wrapperFactory = await ethers.getContractFactory(
      'VRFV2Wrapper',
      owner
    );
    const wrapper = await wrapperFactory.deploy(
      link.address,
      linkEthFeed.address,
      coordinator.address
    );

    // Actual contract
    const Aliens = await ethers.getContractFactory('Aliens');
    const aliens = await Aliens.deploy(link.address, wrapper.address);
    await aliens.deployed();

    link.transfer(aliens.address, ethers.utils.parseEther('10'));
    await wrapper.setConfig(
      ethers.BigNumber.from(60_000), // wrapperGasOverhead,
      ethers.BigNumber.from(52_000), // coordinatorGasOverhead,
      10, // wrapperPremiumPercentage,
      keyHash,
      10 // maxNumWords
    );

    // fund subscription. The Wrapper's subscription id is 1
    await coordinator.connect(owner).fundSubscription(
      1,
      ethers.BigNumber.from('100000000000000000000') // 100 LINK
    );

    const fakeRandomCallback = (
      id: number,
      random: PromiseOrValue<BigNumberish>[]
    ) => {
      return coordinator.fulfillRandomWordsWithOverride(
        id,
        wrapper.address,
        random,
        {
          gasLimit: 1_000_000,
        }
      );
    };

    const earth = await getDeployedContract('BattlefieldEarth');
    const equipment = await getDeployedContract('Equipment');

    // Setup
    await earth.setAliensContract(aliens.address);
    await earth.setEquipmentContract(equipment.address);
    await aliens.setBattlefieldEarthAddress(earth.address);
    await equipment.setBattlefieldAddress(earth.address);
    await earth.populatePlanet();

    // Mint 1 alien
    const alienMintCost = (await aliens.getMintCost()) as BigNumber;
    await aliens.mint(player1.address, { value: alienMintCost });
    await fakeRandomCallback(1, [1]);

    // Mint 10 fuel
    const equipmentMintCost = (await equipment.getMintCost()) as BigNumber;
    await equipment.mint(player1.address, FUEL_ID, 10, {
      value: equipmentMintCost.mul(10),
    });

    return {
      earth,
      owner,
      player1,
      player2,
      aliens,
      equipment,
      equipmentMintCost,
    };
  }

  describe('Deployment', function () {
    it('Should start with 4 aliens', async function () {
      const { earth } = await loadFixture(deployBattlefieldEarthFixture);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length).to.equal(4);
    });
  });

  describe('Attacking', function () {
    it('Should allow a player to attack the planet', async function () {
      const { earth, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const aliensOnPlanet = (await earth.getAliens()).map((alien: Alien) =>
        alien.tokenId.toString()
      );
      expect(aliensOnPlanet).to.include('4');
    });

    it('Should burn 1 fuel', async function () {
      const { earth, equipment, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = await equipment.balanceOf(player1.address, FUEL_ID);
      await earth.connect(player1).attack(ALIEN_ID);
      const balanceAfter = await equipment.balanceOf(player1.address, FUEL_ID);
      expect(balanceAfter).to.equal(balanceBefore.sub(1));
    });

    it('Should replace weakest alien with new alien', async function () {
      const { earth, aliens, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const attackingStrength = await aliens.getAlienStrength(4);
      await earth.connect(player1).attack(ALIEN_ID);
      const aliensOnPlanet = await earth.getAliens();
      const strengths = await Promise.all(
        aliensOnPlanet.map((alien: any) => {
          return aliens.getAlienStrength(alien.tokenId);
        })
      );
      expect(strengths[0]).to.equal(attackingStrength);
    });

    it('Should return kicked out aliens back to owner', async function () {
      const { earth, aliens, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = await aliens.balanceOf(owner.address);
      await earth.connect(player1).attack(ALIEN_ID);
      const balanceAfter = await aliens.balanceOf(owner.address);
      expect(balanceAfter.sub(1)).to.equal(balanceBefore);
    });

    it('Should always have 4 aliens on planet', async function () {
      const { earth, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length, 'Aliens On Planet').to.equal(4);
    });

    it('Should reward aliens left on planet', async function () {
      const { earth, equipment, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const balance = await equipment.balanceOf(owner.address, REWARD_ID);
      expect(balance, 'Balance').to.equal(3);
    });

    it('Should return the correct data for getAliens call', async function () {
      const { earth, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length).to.equal(4);
      const tokenIds = aliensOnPlanet.map((alien: Alien) =>
        Number(alien.tokenId)
      );
      const owners = aliensOnPlanet.map((alien: Alien) => alien.owner);
      const strengths = aliensOnPlanet.map((alien: Alien) =>
        Number(alien.strength)
      );
      const rewards = aliensOnPlanet.map((alien: Alien) =>
        Number(alien.rewardsGiven)
      );
      expect(tokenIds).to.have.members([1, 2, 3, ALIEN_ID]);
      expect(owners).to.have.members([
        owner.address,
        owner.address,
        owner.address,
        player1.address,
      ]);
      const anyStrength = strengths[0];
      expect(strengths).to.have.members([anyStrength, 1, 1, 1]);
      expect(rewards).to.have.members([0, 1, 1, 1]);
    });

    it('Should allow user to cash out reward tokens', async function () {
      const { earth, player1, equipmentMintCost } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const earthBalanceBefore = await ethers.provider.getBalance(
        earth.address
      );
      await earth.sellRewardTokens(3);
      const earthBalanceAfter = await ethers.provider.getBalance(earth.address);
      const actual = earthBalanceBefore.sub(earthBalanceAfter);
      expect(actual).to.eq(equipmentMintCost);
    });

    it('Should payout in return for reward tokens', async function () {
      const { earth, player1, equipment } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(ALIEN_ID);
      const balanceBefore = await equipment.totalSupplyOf(REWARD_ID);
      await earth.sellRewardTokens(1);
      const balanceAfter = await equipment.totalSupplyOf(REWARD_ID);
      expect(balanceBefore).to.eq(3);
      expect(balanceAfter).to.eq(2);
    });
  });
});
