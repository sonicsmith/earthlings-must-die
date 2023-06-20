import { task } from 'hardhat/config';
import { ADDRESSES } from '..';

task('setupContracts', 'Verifies deployed contracts on etherscan')
  .addPositionalParam('chainId', 'The chain ID of the deployed contracts')
  .setAction(async function ({ chainId }, { ethers }) {
    const { ALIENS, EQUIPMENT, BATTLEFIELD } = ADDRESSES[chainId];

    const aliens = await ethers.getContractAt('Aliens', ALIENS);
    const equipment = await ethers.getContractAt('Equipment', EQUIPMENT);
    const battlefieldEarth = await ethers.getContractAt(
      'BattlefieldEarth',
      BATTLEFIELD
    );

    // Set up contracts
    let tx: any;
    console.log('setAliensContract');
    tx = await battlefieldEarth.setAliensContract(ALIENS);
    tx.wait();
    console.log('setEquipmentContract');
    tx = await battlefieldEarth.setEquipmentContract(EQUIPMENT);
    tx.wait();
    console.log('setBattlefieldContract');
    tx = await equipment.setBattlefieldContract(BATTLEFIELD);
    tx.wait();
    console.log('setApprovalForAll');
    tx = await aliens.setApprovalForAll(BATTLEFIELD, true);
    tx.wait();
    console.log('populatePlanet');
    await battlefieldEarth.populatePlanet();

    // Display
    console.log(`Setup Done`);
  });
