import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

const TOKEN_ID = 0;

describe('Equipment', function () {
  async function deployEquipmentFixture() {
    const Equipment = await ethers.getContractFactory('Equipment');
    const [owner, addr1, addr2] = await ethers.getSigners();
    const equipment = await Equipment.deploy();
    await equipment.deployed();
    const mintCost = await equipment.connect(owner).getMintCost();
    return { equipment, owner, addr1, addr2, mintCost };
  }

  describe('Deployment', function () {
    it('Should have no holders', async function () {
      const { equipment, owner } = await loadFixture(deployEquipmentFixture);
      expect(await equipment.balanceOf(owner?.address, 0)).to.equal(0);
    });
  });

  describe('Mint', function () {
    it('should mint a new token', async function () {
      const { equipment, owner, addr1, mintCost } = await loadFixture(
        deployEquipmentFixture
      );
      await equipment
        .connect(owner!)
        .mint(addr1.address, TOKEN_ID, 10, { value: mintCost.mul(10) });

      const balance = await equipment.balanceOf(addr1.address, TOKEN_ID);
      const supply = await equipment.totalSupplyOf(TOKEN_ID);
      expect(balance).to.equal(10);
      expect(supply).to.equal(10);
    });
  });

  describe('Transfer', function () {
    it('should transfer tokens', async function () {
      const { equipment, owner, addr1, addr2, mintCost } = await loadFixture(
        deployEquipmentFixture
      );
      await equipment
        .connect(owner)
        .mint(addr1.address, 1, 10, { value: mintCost.mul(10) });
      await equipment
        .connect(addr1)
        .safeTransferFrom(addr1.address, addr2.address, 1, 5, []);

      const balanceAddr1 = await equipment.balanceOf(addr1.address, 1);
      const balanceAddr2 = await equipment.balanceOf(addr2.address, 1);
      expect(balanceAddr1).to.equal(5);
      expect(balanceAddr2).to.equal(5);
    });

    it('should not allow transfers exceeding balance', async function () {
      const { equipment, owner, addr1, addr2, mintCost } = await loadFixture(
        deployEquipmentFixture
      );

      await equipment
        .connect(owner)
        .mint(addr1.address, 1, 10, { value: mintCost.mul(10) });

      await expect(
        equipment
          .connect(addr1)
          .safeTransferFrom(addr1.address, addr2.address, 1, 15, [])
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');

      const balanceAddr1 = await equipment.balanceOf(addr1.address, 1);
      const balanceAddr2 = await equipment.balanceOf(addr2.address, 1);
      expect(balanceAddr1).to.equal(10);
      expect(balanceAddr2).to.equal(0);
    });
  });
});
