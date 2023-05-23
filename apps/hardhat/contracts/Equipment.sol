// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol';

contract Equipment is ERC1155, Ownable, ERC1155Burnable {
  uint256 public mintCost = 0.005 ether;

  address private battlefieldAddress;
  uint256 private gasBack = 10000000000000000; // Aprox 1 cent

  constructor() ERC1155('') {}

  function setBattlefieldContract(
    address _battlefieldAddress
  ) public onlyOwner {
    battlefieldAddress = _battlefieldAddress;
  }

  function getMintCost() public view returns (uint256) {
    return mintCost;
  }

  function setMintCost(uint256 newCost) public onlyOwner {
    mintCost = newCost;
  }

  function setGasBack(uint256 newGasBack) public onlyOwner {
    gasBack = newGasBack;
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function mint(address recipient, uint256 id, uint256 amount) public payable {
    require(msg.value == mintCost, 'Equipment: value must be mint cost');
    (bool sent, ) = battlefieldAddress.call{value: msg.value}('');
    require(sent, 'Equipment: Failed to pass on value');
    _mint(recipient, id, amount, '');
    // Give user money for gas
    (bool gasSent, ) = recipient.call{value: gasBack}('');
    require(gasSent, 'Aliens: Failed to reimburse');
  }

  function reward(address account, uint256 id, uint256 amount) external {
    require(
      msg.sender == battlefieldAddress,
      'Equipment: Only Battlefield contract can reward'
    );
    _mint(account, id, amount, '');
  }

  function burn(address account, uint256 id, uint256 amount) public override {
    _burn(account, id, amount);
  }

  receive() external payable {
    (bool sent, ) = owner().call{value: msg.value}('');
    require(sent, 'Aliens: Failed to pass on value');
  }
}
