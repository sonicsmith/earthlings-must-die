import battlefieldArtifacts from './artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import aliensArtifacts from './artifacts/contracts/Aliens.sol/Aliens.json';

export const IDS = {
  POLYGON: 137,
  MUMBAI: 80001,
};

const ADDRESSES: {
  [id: number]: {
    ALIENS: `0x${string}`;
    EQUIPMENT: `0x${string}`;
    BATTLEFIELD: `0x${string}`;
  };
} = {
  [IDS.POLYGON]: {
    ALIENS: '0x6027b3aBD87bD10eCBEbD4ac2159C4CeEE873C3a',
    EQUIPMENT: '0x5f6C80776fbc19c11c03A4894cdFb4fcDE1A99a6',
    BATTLEFIELD: '0xF66018Cb772A5dab249512386Fa0Dc342Ce1104c',
  },
  [IDS.MUMBAI]: {
    ALIENS: '0x6027b3aBD87bD10eCBEbD4ac2159C4CeEE873C3a',
    EQUIPMENT: '0x5f6C80776fbc19c11c03A4894cdFb4fcDE1A99a6',
    BATTLEFIELD: '0xF66018Cb772A5dab249512386Fa0Dc342Ce1104c',
  },
};

export { battlefieldArtifacts, aliensArtifacts, ADDRESSES };
