// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Aliens is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private idCounter;

  uint256 public mintCost = 0.01 ether;

  constructor() ERC721('Aliens', 'ALN') {}

  function getMintCost() public view returns (uint256) {
    return mintCost;
  }

  function setMintCost(uint256 newCost) public onlyOwner {
    mintCost = newCost;
  }

  function mint(address to, string memory uri) public payable {
    require(msg.value == mintCost, 'Aliens: value must be mint cost');
    _safeMint(to, idCounter.current());
    _setTokenURI(idCounter.current(), uri);
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }
}
