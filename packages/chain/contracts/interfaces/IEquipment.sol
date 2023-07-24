// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title IEquipment
 * @dev Interface for Equipment
 */
interface IEquipment {
  function isApprovedForAll(
    address _owner,
    address _operator
  ) external view returns (bool);

  function getMintCost() external view returns (uint256);

  function mint(address account, uint256 id, uint256 amount) external payable;

  function reward(address account, uint256 id, uint256 amount) external;

  function burn(address account, uint256 id, uint256 value) external;

  function totalSupplyOf(uint256 id) external view returns (uint256);
}
