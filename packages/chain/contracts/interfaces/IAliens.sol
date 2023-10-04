// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title IAliens
 * @dev Interface for Aliens
 */
interface IAliens {
  function getAlienStrength(uint256 tokenId) external view returns (uint256);

  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  ) external payable;
}
