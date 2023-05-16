import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Aliens', function () {
  let token: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  async function deployAliensFixture() {
    // Get the ContractFactory and Signers here.
    const Aliens = await ethers.getContractFactory('Aliens');
    const [owner, addr1, addr2] = await ethers.getSigners();

    const aliens = await Aliens.deploy(addr1?.address, 'theName', 'theSymbol');

    await aliens.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { aliens, owner, addr1, addr2 };
  }

  describe('Deployment', function () {
    it('Should have no holders', async function () {
      const { aliens, owner } = await loadFixture(deployAliensFixture);
      expect(await aliens.balanceOf(owner?.address, 0)).to.equal(0);
    });
  });

  describe('Mint', function () {
    it('should mint a new token', async function () {
      await token.connect(owner).safeMint(addr1.address, 1, 'theUri');
      expect(await token.ownerOf(1)).to.equal(addr1.address);
    });

    it('should not allow non-owners to mint a new token', async function () {
      await expect(
        token.connect(addr1).mint(addr2.address, 2)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Transfer', function () {
    it('should transfer a token', async function () {
      await token.connect(owner).mint(addr1.address, 3);
      await token.connect(addr1).transferFrom(addr1.address, addr2.address, 3);

      expect(await token.ownerOf(3)).to.equal(addr2.address);
    });

    it('should not allow non-owners to transfer a token', async function () {
      await token.connect(owner).mint(addr1.address, 4);
      await expect(
        token.connect(addr2).transferFrom(addr1.address, addr2.address, 4)
      ).to.be.revertedWith('ERC721: transfer caller is not owner nor approved');
    });
  });
});
