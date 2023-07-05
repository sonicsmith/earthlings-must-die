import { ethers } from 'hardhat';

async function main() {
  console.log('Deploying Equipment contract...');
  const Equipment = await ethers.getContractFactory('Equipment');
  const equipment = await Equipment.deploy();
  await equipment.deployed();
  console.log(`Equipment deployed to: ${equipment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
