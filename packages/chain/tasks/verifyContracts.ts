import { task } from 'hardhat/config';
import { ADDRESSES } from '..';

//npx hardhat verify [address] --network mumbai
task('verifyContracts', 'Verifies deployed contracts on etherscan')
  .addPositionalParam('chain', 'The chain ID of the deployed contracts')
  .setAction(async function ({ chain }, { run }) {
    const { LINK_ADDRESS, VRF_ADDRESS } = ADDRESSES[chain];
    // Verify
    console.log('Verifying Alien contract...', chain);
    await run('verify:verify', {
      address: ADDRESSES[chain].ALIENS,
      constructorArguments: [LINK_ADDRESS, VRF_ADDRESS],
    });
    console.log('Verifying Equipment contract...');
    await run('verify:verify', {
      address: ADDRESSES[chain].EQUIPMENT,
      constructorArguments: [],
    });
    console.log('Verifying BattlefieldEarth contract...');
    await run('verify:verify', {
      address: ADDRESSES[chain].BATTLEFIELD,
      constructorArguments: [],
    });
  });
