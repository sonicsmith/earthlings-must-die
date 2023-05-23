import { ethers } from 'hardhat';

async function main() {
  // Deploy Aliens and Equipment contracts
  const Aliens = await ethers.getContractFactory('Aliens');
  const aliens = await Aliens.deploy();
  await aliens.deployed();
  const Equipment = await ethers.getContractFactory('Equipment');
  const equipment = await Equipment.deploy();
  await equipment.deployed();
  // Deploy BattlefieldEarth
  const BattlefieldEarth = await ethers.getContractFactory('BattlefieldEarth');
  const battlefieldEarth = await BattlefieldEarth.deploy();
  await battlefieldEarth.deployed();
  // Set up contracts
  await battlefieldEarth.setAliensContract(aliens.address);
  await battlefieldEarth.setEquipmentContract(equipment.address);
  await equipment.setBattlefieldContract(battlefieldEarth.address);

  console.log(`Aliens deployed to: ${aliens.address}`);
  console.log(`Equipment deployed to: ${equipment.address}`);
  console.log(`BattlefieldEarth deployed to: ${battlefieldEarth.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
