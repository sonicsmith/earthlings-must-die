import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Equipment', function () {
  let token: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  async function deployEquipmentFixture() {
    // Get the ContractFactory and Signers here.
    const Equipment = await ethers.getContractFactory('Equipment');
    const [owner, addr1, addr2] = await ethers.getSigners();

    const equipment = await Equipment.deploy();

    await equipment.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { equipment, owner, addr1, addr2 };
  }

  it('should mint a new token', async function () {
    const { equipment, owner } = await loadFixture(deployEquipmentFixture);
    await equipment.connect(owner!).mint(addr1.address, 1, 10);

    const balance = await equipment.balanceOf(addr1.address, 1);
    expect(balance).to.equal(10);
  });

  it('should transfer tokens', async function () {
    await token.connect(owner).mint(addr1.address, 1, 10);
    await token
      .connect(addr1)
      .safeTransferFrom(
        addr1.address,
        addr2.address,
        1,
        5,
        ethers.utils.toUtf8Bytes('')
      );

    const balanceAddr1 = await token.balanceOf(addr1.address, 1);
    const balanceAddr2 = await token.balanceOf(addr2.address, 1);
    expect(balanceAddr1).to.equal(5);
    expect(balanceAddr2).to.equal(5);
  });

  it('should not allow transfers exceeding balance', async function () {
    await token.connect(owner).mint(addr1.address, 1, 10);

    await expect(
      token
        .connect(addr1)
        .safeTransferFrom(
          addr1.address,
          addr2.address,
          1,
          15,
          ethers.utils.toUtf8Bytes('')
        )
    ).to.be.revertedWith('ERC1155: insufficient balance for transfer');

    const balanceAddr1 = await token.balanceOf(addr1.address, 1);
    const balanceAddr2 = await token.balanceOf(addr2.address, 1);
    expect(balanceAddr1).to.equal(10);
    expect(balanceAddr2).to.equal(0);
  });
});
