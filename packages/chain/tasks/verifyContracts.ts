import { task } from 'hardhat/config';
import dotenv from 'dotenv';
import { ADDRESSES } from '..';

dotenv.config();

task('verifyContracts', 'Verifies deployed contracts on etherscan')
  .addPositionalParam('chainId', 'The chain ID of the deployed contracts')
  .setAction(async function ({ chainId }, { run }) {
    // Verify
    console.log('Verifying Alien contract...');
    await run('verify:verify', {
      address: ADDRESSES[chainId].ALIENS,
      constructorArguments: [],
    });
    console.log('Verifying Equipment contract...');
    await run('verify:verify', {
      address: ADDRESSES[chainId].EQUIPMENT,
      constructorArguments: [],
    });
    console.log('Verifying BattlefieldEarth contract...');
    await run('verify:verify', {
      address: ADDRESSES[chainId].BATTLEFIELD,
      constructorArguments: [],
    });
  });
