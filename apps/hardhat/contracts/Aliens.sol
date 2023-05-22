// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Aliens is ERC721, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private idCounter;

  uint256 private mintCost = 0.005 ether;
  uint256 private maxStrength = 10;
  string private baseUri = '';

  struct AlienRace {
    uint256 strength;
    uint256 createdAtBlock;
  }
  mapping(uint256 => AlienRace) public alienRaces;

  constructor() ERC721('Aliens', 'ALN') {
    // Premint 4 to aliens to creator
    uint8[4] memory strengths = [1, 2, 2, 2];
    for (uint256 i = 0; i < 4; i++) {
      _safeMint(msg.sender, idCounter.current());
      alienRaces[idCounter.current()] = AlienRace(strengths[i], block.number);
      idCounter.increment();
    }
  }

  function getMintCost() public view returns (uint256) {
    return mintCost;
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

  function mint(address to) public payable {
    require(msg.value == mintCost, 'Aliens: value must be mint cost');
    _safeMint(to, idCounter.current());
    alienRaces[idCounter.current()] = AlienRace(0, block.number);
    alienRaces[idCounter.current()].createdAtBlock = block.number;
    idCounter.increment();
  }

  function setBaseUri(string memory _baseUri) public onlyOwner {
    baseUri = _baseUri;
  }

  function baseTokenURI() public view returns (string memory) {
    return baseUri;
  }
}
