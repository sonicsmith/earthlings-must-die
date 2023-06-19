import { ethers, run } from 'hardhat';

async function main() {
  // Deploy Aliens and Equipment contracts
  console.log('Deploying Aliens contract...');
  const Aliens = await ethers.getContractFactory('Aliens');
  const aliens = await Aliens.deploy();
  await aliens.deployed();
  console.log(`Aliens deployed to: ${aliens.address}`);

  console.log('Deploying Equipment contract...');
  const Equipment = await ethers.getContractFactory('Equipment');
  const equipment = await Equipment.deploy();
  await equipment.deployed();
  console.log(`Equipment deployed to: ${equipment.address}`);

  // Deploy BattlefieldEarth
  console.log('Deploying BattlefieldEarth contract...');
  const BattlefieldEarth = await ethers.getContractFactory('BattlefieldEarth');
  const battlefieldEarth = await BattlefieldEarth.deploy();
  await battlefieldEarth.deployed();
  console.log(`BattlefieldEarth deployed to: ${battlefieldEarth.address}`);

  // Set up contracts
  console.log('Setting up contracts...');
  await battlefieldEarth.setAliensContract(aliens.address);
  await battlefieldEarth.setEquipmentContract(equipment.address);
  await equipment.setBattlefieldContract(battlefieldEarth.address);
  await battlefieldEarth.populatePlanet();

  // Verifying
  await run('verify:verify', {
    address: aliens.address,
    constructorArguments: [],
  });
  console.log('Verifying Equipment contract...');
  await run('verify:verify', {
    address: equipment.address,
    constructorArguments: [],
  });
  console.log('Verifying BattlefieldEarth contract...');
  await run('verify:verify', {
    address: battlefieldEarth.address,
    constructorArguments: [],
  });

  // Display
  console.log(`Deployment Done`);

  console.log('Update new contract addresses in packages/chain/index.ts');
  console.log(`ALIENS: '${aliens.address}'`);
  console.log(`EQUIPMENT: '${equipment.address}'`);
  console.log(`BATTLEFIELD: '${battlefieldEarth.address}'`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
