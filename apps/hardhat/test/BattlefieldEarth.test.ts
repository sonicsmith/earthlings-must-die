import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

const FUEL_ID = 0;

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
    await equipment.mint(player1.address, 0, 10, { value: equipmentMintCost });

    const earth = await BattlefieldEarth.deploy();
    await earth.deployed();
    await earth.setAliensContract(aliens.address);
    await earth.setEquipmentContract(equipment.address);
    await aliens.setApprovalForAll(earth.address, true);
    await aliens.connect(player1).setApprovalForAll(earth.address, true);
    await equipment.connect(player1).setApprovalForAll(earth.address, true);
    await equipment.setBattlefieldContract(earth.address);
    await earth.populatePlanet();

    return { earth, owner, player1, player2, aliens, equipment };
  }

  describe('Deployment', function () {
    it('Should have allow us to start with 4 aliens', async function () {
      const { earth } = await loadFixture(deployBattlefieldEarthFixture);
      const aliensOnPlanet = await earth.getAliens();
      expect(aliensOnPlanet.length).to.equal(4);
    });
  });

  describe.only('Attacking', function () {
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
    it('Should burn 3 fuel', async function () {
      const { earth, equipment, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = (
        await equipment.balanceOf(player1.address, FUEL_ID)
      ).toNumber();
      await earth.connect(player1).attack(4);
      const balanceAfter = (
        await equipment.balanceOf(player1.address, FUEL_ID)
      ).toNumber();
      expect(balanceAfter).to.equal(balanceBefore - 3);
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

    it('Should reward aliens left on planet', async function () {
      const { earth, equipment, owner, player1 } = await loadFixture(
        deployBattlefieldEarthFixture
      );
      const balanceBefore = (
        await equipment.balanceOf(owner.address, FUEL_ID)
      ).toNumber();
      await earth.connect(player1).attack(4);
      const balanceAfter = (
        await equipment.balanceOf(owner.address, FUEL_ID)
      ).toNumber();
      expect(balanceAfter - 3).to.equal(balanceBefore);
    });
  });
});
