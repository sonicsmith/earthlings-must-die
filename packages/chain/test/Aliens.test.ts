import { ethers } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { PromiseOrValue } from '../typechain/common';
import { BigNumberish } from 'ethers';

// Needed for Chainlink mocks
const keyHash =
  '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc';

describe('Aliens', function () {
  async function deployAliensFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

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

    const mintCost = await aliens.connect(owner).getMintCost();
    return { aliens, owner, addr1, addr2, mintCost, fakeRandomCallback };
  }

  describe('Deployment', function () {
    it('Should premint 4 aliens', async function () {
      const { aliens, owner } = await loadFixture(deployAliensFixture);
      expect(await aliens.balanceOf(owner?.address)).to.equal(4);
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
      expect(await aliens.ownerOf(4)).to.equal(addr1.address);
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
      const { aliens, owner, addr2 } = await loadFixture(deployAliensFixture);
      const from = owner.address;
      const to = addr2.address;
      await aliens.transferFrom(from, to, 0);
      expect(await aliens.ownerOf(0)).to.equal(addr2.address);
    });

    it('should not allow non-owners to transfer a token', async function () {
      const { aliens, addr1, addr2 } = await loadFixture(deployAliensFixture);
      const from = addr1.address;
      const to = addr2.address;
      const transfer = aliens.connect(addr2).transferFrom(from, to, 0);
      await expect(transfer).to.be.rejectedWith(
        'ERC721: caller is not token owner or approved'
      );
    });

    it('should allow random strength to be set', async function () {
      const { aliens, owner, addr1, mintCost, fakeRandomCallback } =
        await loadFixture(deployAliensFixture);
      await aliens
        .connect(owner)
        .mint(addr1.address, { value: mintCost.toString() });

      await fakeRandomCallback(1, [123]);

      const strength = await aliens.getAlienStrength(4);
      expect(strength).to.be.gt(0);
    });

    it('should allow funds to be claimed', async function () {
      const { aliens, owner, addr1, mintCost } = await loadFixture(
        deployAliensFixture
      );
      await aliens.mint(addr1.address, { value: mintCost });
      const balanceBefore = await ethers.provider.getBalance(addr1.address);
      await aliens.connect(owner).claimFunds(addr1.address);
      const balanceAfter = await ethers.provider.getBalance(addr1.address);
      expect(balanceAfter.sub(balanceBefore)).to.equal(mintCost);
    });
  });
});
