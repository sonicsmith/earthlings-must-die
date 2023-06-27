// // ts-ignore
// import battlefieldArtifacts from './artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
// import aliensArtifacts from './artifacts/contracts/Aliens.sol/Aliens.json';

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
    ALIENS: '0x17410A31DA84d24a3F40caf1F0409fCe7c907963',
    EQUIPMENT: '0x20a02e56150c9E89f324D2afC2a82bE5751F91b8',
    BATTLEFIELD: '0x52FA6936170265D647080DF6bc2BbA931101DAB0',
  },
  [IDS.MUMBAI]: {
    ALIENS: '0x17410A31DA84d24a3F40caf1F0409fCe7c907963',
    EQUIPMENT: '0x20a02e56150c9E89f324D2afC2a82bE5751F91b8',
    BATTLEFIELD: '0x52FA6936170265D647080DF6bc2BbA931101DAB0',
  },
};

export { ADDRESSES };
