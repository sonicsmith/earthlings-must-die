import { ethers, run } from 'hardhat';
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
  const linkToken = await ethers.getContractAt('LinkToken', LINK_ADDRESS);
  linkToken.transfer(aliens.address, LINK_AMOUNT);
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
  console.log('setAliensContract');
  await battlefieldEarth.setAliensContract(aliens.address);
  console.log('setEquipmentContract');
  await battlefieldEarth.setEquipmentContract(equipment.address);
  console.log('setBattlefieldAddress');
  await equipment.setBattlefieldAddress(battlefieldEarth.address);
  console.log('populatePlanet');
  await battlefieldEarth.populatePlanet();

  // Verifying
  console.log('Verifying Alien contract...');
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
