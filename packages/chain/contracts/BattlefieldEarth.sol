// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IAliens.sol';
import './interfaces/IEquipment.sol';

contract BattlefieldEarth is ERC721Holder, ERC1155Holder, Ownable {
  IAliens private aliensContract;
  IEquipment private equipmentContract;

  uint8 private constant FUEL = 0;
  uint8 private constant REWARD = 1;

  struct AlienOnPlanet {
    uint256 tokenId;
    address owner;
    uint256 strength;
    uint256 rewardsGiven;
  }

  AlienOnPlanet[] private aliensOnPlanet;

  constructor() {}

  function populatePlanet() public onlyOwner {
    require(
      aliensOnPlanet.length == 0,
      'BattlefieldEarth: Planet already populated'
    );
    // Start planet with 4 existing aliens
    for (uint256 i = 0; i < 4; i++) {
      aliensContract.safeTransferFrom(msg.sender, address(this), i);
      aliensOnPlanet.push(AlienOnPlanet(i, msg.sender, 1, 0));
    }
  }

  function setAliensContract(address _aliensContract) public onlyOwner {
    aliensContract = IAliens(_aliensContract);
  }

  function setEquipmentContract(address _equipmentContract) public onlyOwner {
    equipmentContract = IEquipment(_equipmentContract);
  }

  function rewardCurrentInvaders(uint256 excludeToken) internal {
    // Reward existing aliens with fuel
    for (uint256 i = 0; i < aliensOnPlanet.length; i++) {
      if (aliensOnPlanet[i].tokenId != excludeToken) {
        equipmentContract.reward(aliensOnPlanet[i].owner, REWARD, 1);
        aliensOnPlanet[i].rewardsGiven += 1;
      }
    }
  }

  function sellRewardTokens(uint256 numberOfTokens) public {
    equipmentContract.burn(msg.sender, REWARD, numberOfTokens);
    uint256 fuelCost = equipmentContract.getMintCost();
    uint256 rewardValue = numberOfTokens * (fuelCost / 3);
    (bool sent, ) = msg.sender.call{value: rewardValue}('');
    require(sent, 'Battlefield: Failed to reimburse');
  }

  function attack(uint256 _tokenId) public {
    // Move alien to planet and burn fuel
    aliensContract.safeTransferFrom(msg.sender, address(this), _tokenId);
    equipmentContract.burn(msg.sender, FUEL, 1);

    // Send weakest alien back to owner
    uint256 weakestAlienIndex = getWeakestAlienIndex();
    aliensContract.safeTransferFrom(
      address(this),
      aliensOnPlanet[weakestAlienIndex].owner,
      aliensOnPlanet[weakestAlienIndex].tokenId
    );
    // Replace weakest alien from planet with new comer
    uint256 alienStrength = aliensContract.getAlienStrength(_tokenId);
    AlienOnPlanet memory newAlien = AlienOnPlanet(
      _tokenId,
      msg.sender,
      alienStrength,
      0
    );
    aliensOnPlanet[weakestAlienIndex] = newAlien;
    rewardCurrentInvaders(_tokenId);
  }

  function getAliens() public view returns (AlienOnPlanet[] memory) {
    return aliensOnPlanet;
  }

  function getWeakestAlienIndex() internal view returns (uint256) {
    uint256 weakestAlienStrength;
    uint256 weakestAlienIndex;
    for (uint256 i = 0; i < aliensOnPlanet.length; i++) {
      if (aliensOnPlanet[i].strength < weakestAlienStrength) {
        weakestAlienStrength = aliensOnPlanet[i].strength;
        weakestAlienIndex = aliensOnPlanet[i].tokenId;
      }
    }
    return weakestAlienIndex;
  }

  receive() external payable {}

  fallback() external payable {}
}
