import { task } from 'hardhat/config';
import { ADDRESSES } from '..';

task('setupContracts', 'Verifies deployed contracts on etherscan').setAction(
  async function ({}, { ethers, network }) {
    const chainId = network.name;

    const { ALIENS, EQUIPMENT, BATTLEFIELD } = ADDRESSES[chainId];

    const aliens = await ethers.getContractAt('Aliens', ALIENS);
    const equipment = await ethers.getContractAt('Equipment', EQUIPMENT);
    const battlefieldEarth = await ethers.getContractAt(
      'BattlefieldEarth',
      BATTLEFIELD
    );

    // Set up contracts
    let tx: any;
    console.log('battlefieldEarth.setAliensContract');
    tx = await battlefieldEarth.setAliensContract(ALIENS);
    await tx.wait();
    console.log('battlefieldEarth.setEquipmentContract');
    tx = await battlefieldEarth.setEquipmentContract(EQUIPMENT);
    await tx.wait();
    console.log('equipment.setBattlefieldAddress');
    tx = await equipment.setBattlefieldAddress(BATTLEFIELD);
    await tx.wait();
    console.log('aliens.setBattlefieldAddress');
    tx = await aliens.setBattlefieldEarthAddress(BATTLEFIELD);
    await tx.wait();
    console.log('populatePlanet');
    await battlefieldEarth.populatePlanet();

    // Display
    console.log(`Setup Done`);
  }
);
