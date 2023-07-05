// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol';

contract Equipment is ERC1155, Ownable, ERC1155Burnable {
  uint256 private mintCost = 10 ether;
  uint256 private gasBack = 0.01 ether;
  address payable private battlefieldAddress;
  mapping(uint256 => uint256) private totalSupply;

  constructor() ERC1155('') {}

  function setBattlefieldAddress(
    address payable _battlefieldAddress
  ) public onlyOwner {
    battlefieldAddress = _battlefieldAddress;
  }

  function getMintCost() public view returns (uint256) {
    return mintCost;
  }

  function setMintCost(uint256 newCost) public onlyOwner {
    mintCost = newCost;
  }

  function getGasBack() public view returns (uint256) {
    return gasBack;
  }

  function setGasBack(uint256 newGasBack) public onlyOwner {
    gasBack = newGasBack;
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function mint(
    address payable recipient,
    uint256 id,
    uint256 amount
  ) public payable {
    uint256 totalCost = mintCost * amount;
    require(msg.value == totalCost, 'Equipment: value must be mint cost');
    // Send money to battlefield contract
    uint256 totalGasBack = gasBack * amount;
    uint256 battleAmount = totalCost - totalGasBack;
    (bool sent, ) = battlefieldAddress.call{value: battleAmount}('');
    require(sent, 'Equipment: Failed to pass on value');
    // Give user money for gas
    (bool gasSent, ) = recipient.call{value: totalGasBack}('');
    require(gasSent, 'Equipment: Failed to reimburse');
    _mint(recipient, id, amount, '');
    totalSupply[id] += amount;
  }

  function reward(address account, uint256 id, uint256 amount) external {
    require(
      msg.sender == battlefieldAddress,
      'Equipment: Only Battlefield contract can reward'
    );
    _mint(account, id, amount, '');
    totalSupply[id] += amount;
  }

  function burn(address account, uint256 id, uint256 amount) public override {
    require(
      msg.sender == battlefieldAddress,
      'Equipment: Only Battlefield contract can burn'
    );
    _burn(account, id, amount);
    totalSupply[id] -= amount;
  }

  function totalSupplyOf(uint256 id) public view returns (uint256) {
    return totalSupply[id];
  }

  /**
   * @dev See {IERC1155-isApprovedForAll}.
   */
  function isApprovedForAll(
    address owner,
    address operator
  ) public view virtual override returns (bool) {
    if (operator == battlefieldAddress) {
      return true;
    }
    return super.isApprovedForAll(owner, operator);
  }

  receive() external payable {}

  fallback() external payable {}
}
