// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import './interfaces/IAliens.sol';
import './interfaces/IEquipment.sol';

contract BattlefieldEarth {
  IAliens private aliensContract;
  IEquipment private equipmentContract;

  struct AlienOnPlanet {
    uint256 tokenId;
    address owner;
  }

  AlienOnPlanet[] private aliensOnPlanet;

  constructor() {}

  function setAlienContract(address _aliensContract) public {
    aliensContract = IAliens(_aliensContract);
  }

  function setEquipmentContract(address _equipmentContract) public {
    equipmentContract = IEquipment(_equipmentContract);
  }

  function attack(uint256 _tokenId) public {
    require(
      aliensContract.getApproved(_tokenId) == address(this),
      'BattlefieldEarth: Alien not approved for transfer'
    );
    require(
      equipmentContract.isApprovedForAll(msg.sender, address(this)),
      'BattlefieldEarth: Fuel not approved for transfer'
    );
    // Move alien to planet
    aliensContract.safeTransferFrom(msg.sender, address(this), _tokenId);
    // Burn Fuel
    equipmentContract.burn(msg.sender, 1, 1);

    // Find weakest alien currently on planet
    uint256 weakestAlienStrength;
    uint256 weakestAlienIndex;
    for (uint256 i = 0; i < aliensOnPlanet.length; i++) {
      uint256 alienStrength = aliensContract.getAlienStrength(
        aliensOnPlanet[i].tokenId
      );
      if (alienStrength < weakestAlienStrength) {
        weakestAlienStrength = alienStrength;
        weakestAlienIndex = aliensOnPlanet[i].tokenId;
      }
    }
    // Send alien back to owner
    aliensContract.safeTransferFrom(
      address(this),
      aliensOnPlanet[weakestAlienIndex].owner,
      aliensOnPlanet[weakestAlienIndex].tokenId
    );
    // Replace weakest alien from planet with new comer
    AlienOnPlanet memory newAlien = AlienOnPlanet(_tokenId, msg.sender);
    aliensOnPlanet[weakestAlienIndex] = newAlien;
  }

  function getAliens() public view returns (AlienOnPlanet[] memory) {
    return aliensOnPlanet;
  }
}
