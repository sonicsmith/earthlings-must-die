// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Aliens is ERC721, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private idCounter;

  uint256 private mintCost = 10 ether;
  uint256 private gasBack = 0.01 ether;
  uint256 private maxStrength = 10;
  string private baseUri = '';

  struct AlienRace {
    uint256 strength;
    uint256 createdAtBlock;
  }
  mapping(uint256 => AlienRace) public alienRaces;

  constructor() ERC721('Aliens', 'ALN') {
    // Premint 4 to aliens to creator
    for (uint256 i = 0; i < 4; i++) {
      _safeMint(msg.sender, idCounter.current());
      alienRaces[idCounter.current()] = AlienRace(1, block.number);
      idCounter.increment();
    }
  }

  function getMintCost() public view returns (uint256) {
    return mintCost;
  }

  function setGasBack(uint256 newGasBack) public onlyOwner {
    gasBack = newGasBack;
  }

  function setMintCost(uint256 newCost) public onlyOwner {
    mintCost = newCost;
  }

  function setAlienStrength(uint256 tokenId) public {
    // Only allow strength to be set once
    require(alienRaces[tokenId].strength == 0, 'Aliens: strength already set');
    uint256 nextBlockNumber = alienRaces[tokenId].createdAtBlock + 1;
    bytes32 nextBlockhash = blockhash(nextBlockNumber);
    uint256 randomStrength = uint256(nextBlockhash) % maxStrength;
    alienRaces[tokenId].strength = randomStrength;
  }

  function getAlienStrength(uint256 tokenId) public view returns (uint256) {
    return alienRaces[tokenId].strength;
  }

  function mint(address payable recipient) public payable {
    require(msg.value == mintCost, 'Aliens: value must be mint cost');
    _safeMint(recipient, idCounter.current());
    alienRaces[idCounter.current()] = AlienRace(0, block.number);
    alienRaces[idCounter.current()].createdAtBlock = block.number;
    idCounter.increment();
    // Give user money for gas
    (bool gasSent, ) = recipient.call{value: gasBack}('');
    require(gasSent, 'Aliens: Failed to reimburse');
  }

  function setBaseUri(string memory _baseUri) public onlyOwner {
    baseUri = _baseUri;
  }

  function baseTokenURI() public view returns (string memory) {
    return baseUri;
  }

  receive() external payable {
    (bool sent, ) = owner().call{value: msg.value}('');
    require(sent, 'Aliens: Failed to pass on value');
  }
}
