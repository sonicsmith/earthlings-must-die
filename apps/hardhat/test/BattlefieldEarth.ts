import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Battlefield Earth', function () {
  async function deployBattlefieldEarthFixture() {
    const BattlefieldEarth = await ethers.getContractFactory(
      'BattlefieldEarth'
    );
    const [owner, addr1, addr2] = await ethers.getSigners();
    const earth = await BattlefieldEarth.deploy();
    await earth.deployed();
    return { earth, owner, addr1, addr2 };
  }

  describe('Deployment', function () {
    it('Should have no aliens', async function () {
      const { earth, owner } = await loadFixture(deployBattlefieldEarthFixture);
      expect(await earth.getAliens()).to.deep.equal([]);
    });
  });
});
