import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Aliens', function () {
  async function deployAliensFixture() {
    const Aliens = await ethers.getContractFactory('Aliens');
    const [owner, addr1, addr2] = await ethers.getSigners();
    const aliens = await Aliens.deploy();
    await aliens.deployed();
    const mintCost = await aliens.connect(owner).getMintCost();
    return { aliens, owner, addr1, addr2, mintCost };
  }

  describe('Deployment', function () {
    it('Should have no holders', async function () {
      const { aliens, owner } = await loadFixture(deployAliensFixture);
      expect(await aliens.balanceOf(owner?.address)).to.equal(0);
    });
  });

  describe('Mint', function () {
    it('should mint a new token', async function () {
      const { aliens, owner, addr1, mintCost } = await loadFixture(
        deployAliensFixture
      );
      await aliens
        .connect(owner)
        .mint(addr1.address, { value: mintCost.toString() });
      expect(await aliens.ownerOf(0)).to.equal(addr1.address);
    });

    it('should not allow mint without paying', async function () {
      const { aliens, addr1, addr2 } = await loadFixture(deployAliensFixture);
      await expect(
        aliens.connect(addr1).mint(addr2.address)
      ).to.be.rejectedWith('Aliens: value must be mint cost');
    });
  });

  describe('Transfer', function () {
    it('should transfer a token', async function () {
      const { aliens, owner, addr1, addr2, mintCost } = await loadFixture(
        deployAliensFixture
      );
      const from = addr1.address;
      const to = addr2.address;
      await aliens
        .connect(owner)
        .mint(addr1.address, { value: mintCost.toString() });
      await aliens.connect(addr1).transferFrom(from, to, 0);
      expect(await aliens.ownerOf(0)).to.equal(addr2.address);
    });

    it('should not allow non-owners to transfer a token', async function () {
      const { aliens, owner, addr1, addr2, mintCost } = await loadFixture(
        deployAliensFixture
      );
      await aliens
        .connect(owner)
        .mint(addr1.address, { value: mintCost.toString() });
      const from = addr1.address;
      const to = addr2.address;
      const transfer = aliens.connect(addr2).transferFrom(from, to, 0);
      await expect(transfer).to.be.rejectedWith(
        'ERC721: caller is not token owner or approved'
      );
    });

    it('should allow random strength to be set', async function () {
      const { aliens, owner, addr1, mintCost } = await loadFixture(
        deployAliensFixture
      );
      await aliens
        .connect(owner)
        .mint(addr1.address, { value: mintCost.toString() });
      // Two blocks time
      await network.provider.send('evm_mine');
      await network.provider.send('evm_mine');
      await aliens.connect(addr1).setAlienStrength(0);
      const strength = await aliens.getAlienStrength(0);
      expect(strength).to.be.gt(0);
    });
  });
});
