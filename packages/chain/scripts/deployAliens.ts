import { ethers } from 'hardhat';
import { ADDRESSES } from '..';

const LINK_AMOUNT = ethers.utils.parseEther('5');

async function main() {
  // Deploy Aliens and Equipment contracts
  console.log('Deploying Aliens contract...');
  const Aliens = await ethers.getContractFactory('Aliens');
  const network = process.env.HARDHAT_NETWORK || 'polygon';
  const { LINK_ADDRESS, VRF_ADDRESS } = ADDRESSES[network];
  const aliens = await Aliens.deploy(LINK_ADDRESS, VRF_ADDRESS);
  await aliens.deployed();

  // Add Link Tokens
  console.log('Transferring LINK...');
  const linkToken = await ethers.getContractAt('LinkToken', LINK_ADDRESS);
  linkToken.transfer(aliens.address, LINK_AMOUNT);

  console.log(`Aliens deployed to: ${aliens.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
