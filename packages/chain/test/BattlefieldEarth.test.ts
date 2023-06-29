import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

const FUEL_ID = 0;
const REWARD_ID = 1;

const parseEther = ethers.utils.parseEther;

const ETH = parseEther('1');

describe('Battlefield Earth', function () {
  async function deployBattlefieldEarthFixture() {
    const [owner, player1, player2] = await ethers.getSigners();

    const BattlefieldEarth = await ethers.getContractFactory(
      'BattlefieldEarth'
    );
    // Aliens
    const Aliens = await ethers.getContractFactory('Aliens');
    const aliens = await Aliens.deploy();
    await aliens.deployed();
    const alienMintCost = await aliens.getMintCost();
    // Mint 3 aliens
    for (let i = 0; i < 3; i++) {
      await aliens.mint(player1.address, { value: alienMintCost });
      await network.provider.send('evm_mine');
      await network.provider.send('evm_mine');
      await aliens.setAlienStrength(4 + i);
    }
    // Equipment
    const Equipment = await ethers.getContractFactory('Equipment');
    const equipment = await Equipment.deploy();
    await equipment.deployed();
    const equipmentMintCost = await equipment.getMintCost();
    await equipment.mint(player1.address, FUEL_ID, 10, {
      value: equipmentMintCost,
    });

    const earth = await BattlefieldEarth.deploy();
    await earth.deployed();
    await earth.setAliensContract(aliens.address);
    await earth.setEquipmentContract(equipment.address);
    await aliens.setBattlefieldEarthAddress(earth.address);
    await equipment.setBattlefieldContract(earth.address);
    await earth.populatePlanet();

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
      await earth.connect(player1).attack(4);
      const aliensOnPlanet = (await earth.getAliens()).map((alien) =>
        alien.tokenId.toString()
      );
      expect(aliensOnPlanet).to.include('4');
    });

    it('Should burn 1 fuel', async function () {
      const { earth, equipment, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = (
        await equipment.balanceOf(player1.address, FUEL_ID)
      ).toNumber();
      await earth.connect(player1).attack(4);
      const balanceAfter = (
        await equipment.balanceOf(player1.address, FUEL_ID)
      ).toNumber();
      expect(balanceAfter).to.equal(balanceBefore - 1);
    });

    it('Should replace weakest alien with new alien', async function () {
      const { earth, aliens, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const attackingStrength = await aliens.getAlienStrength(4);
      await earth.connect(player1).attack(4);
      const aliensOnPlanet = await earth.getAliens();
      const strengths = await Promise.all(
        aliensOnPlanet.map((alien) => {
          return aliens
            .getAlienStrength(alien.tokenId)
            .then((s) => s.toNumber());
        })
      );
      expect(strengths[0]).to.equal(attackingStrength.toNumber());
    });

    it('Should return kicked out aliens back to owner', async function () {
      const { earth, aliens, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = await aliens
        .balanceOf(owner.address)
        .then((a) => a.toNumber());
      await earth.connect(player1).attack(4);
      const balanceAfter = await aliens
        .balanceOf(owner.address)
        .then((a) => a.toNumber());
      expect(balanceAfter - 1).to.equal(balanceBefore);
    });

    it('Should always have 4 aliens on planet', async function () {
      const { earth, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(4);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length, 'Aliens On Planet').to.equal(4);
    });

    it('Should reward aliens left on planet', async function () {
      const { earth, equipment, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(4);
      const balance = await equipment.balanceOf(owner.address, REWARD_ID);
      expect(balance, 'Balance').to.equal(3);
    });

    it('Should return the correct data for getAliens call', async function () {
      const { earth, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(4);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length).to.equal(4);
      const tokenIds = aliensOnPlanet.map((alien) => Number(alien.tokenId));
      const owners = aliensOnPlanet.map((alien) => alien.owner);
      const strengths = aliensOnPlanet.map((alien) => Number(alien.strength));
      const rewards = aliensOnPlanet.map((alien) => Number(alien.rewardsGiven));
      expect(tokenIds).to.have.members([1, 2, 3, 4]);
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

    it.only('Should allow user to cash out reward tokens', async function () {
      const { earth, owner, player1, equipmentMintCost, equipment } =
        await loadFixture(deployBattlefieldEarthFixture);
      await earth.connect(player1).attack(4);
      const balanceBefore = await owner.getBalance();
      await earth.sellRewardTokens(1);
      const balanceAfter = await owner.getBalance();
      const totalSupply = await equipment.totalSupplyOf(1);
      const earthBalance = await ethers.provider.getBalance(earth.address);
      const expected = earthBalance.div(totalSupply);
      console.log('earthBalance:', earthBalance.toString());
      console.log('totalSupply:', totalSupply.toString());
      console.log('difference:', balanceAfter.sub(balanceBefore).toString());
      // expect(balanceAfter.div(ETH)).to.eq(expected.div(ETH));
    });

    it('Should payout in return for reward tokens', async function () {
      const { earth, player1, equipment } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      await earth.connect(player1).attack(4);
      const balanceBefore = await equipment.totalSupplyOf(REWARD_ID);
      await earth.sellRewardTokens(1);
      const balanceAfter = await equipment.totalSupplyOf(REWARD_ID);
      expect(balanceBefore).to.eq(3);
      expect(balanceAfter).to.eq(2);
    });
  });
});
