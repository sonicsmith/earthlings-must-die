import { ethers, run } from 'hardhat';

async function main() {
  // Deploy Aliens and Equipment contracts
  console.log('Deploying Aliens contract...');
  const Aliens = await ethers.getContractFactory('Aliens');
  const aliens = await Aliens.deploy();
  const tx = await aliens.deployed();
  console.log(`Aliens deployed to: ${aliens.address}`);

  // Display
  console.log(`Deployment Done`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
