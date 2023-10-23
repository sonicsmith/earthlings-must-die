// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol';

contract Aliens is
  ERC721,
  ERC721Enumerable,
  ERC721Burnable,
  Ownable,
  VRFV2WrapperConsumerBase
{
  using Counters for Counters.Counter;
  Counters.Counter private idCounter;

  uint256 private mintCost = 1_000_000 gwei;
  string private baseUri = 'https://www.humansmustdie.com/api/aliens/';
  address private battlefieldEarthAddress;
  address private linkAddress;

  mapping(uint256 => uint256) public vrfRequests;
  mapping(uint256 => uint256) public alienStrengths;

  constructor(
    address _linkAddress,
    address _wrapperAddress
  )
    ERC721('Aliens', 'ALN')
    VRFV2WrapperConsumerBase(_linkAddress, _wrapperAddress)
  {
    // Premint 4 to aliens to creator
    for (uint256 i = 0; i < 4; i++) {
      _safeMint(msg.sender, idCounter.current());
      alienStrengths[idCounter.current()] = 1;
      idCounter.increment();
    }
    linkAddress = _linkAddress;
  }

  function setBattlefieldEarthAddress(address newAddress) public onlyOwner {
    battlefieldEarthAddress = newAddress;
  }

  function getMintCost() public view returns (uint256) {
    return mintCost;
  }

  function setMintCost(uint256 newCost) public onlyOwner {
    mintCost = newCost;
  }

  function fulfillRandomWords(
    uint256 _requestId,
    uint256[] memory _randomWords
  ) internal override {
    require(vrfRequests[_requestId] > 0, 'Aliens: VRF Request not found');
    require(
      alienStrengths[vrfRequests[_requestId]] == 0,
      'Aliens: strength already set'
    );

    // Strength of aliens increases over time
    uint256 maxStrength = 9 + idCounter.current() / 10;
    uint256 randomStrength = _randomWords[0] % maxStrength;
    alienStrengths[vrfRequests[_requestId]] = randomStrength + 1;
  }

  function getAlienStrength(uint256 tokenId) public view returns (uint256) {
    return alienStrengths[tokenId];
  }

  function mint(address payable recipient) public payable {
    require(msg.value >= mintCost, 'Aliens: value must be mint cost');
    _safeMint(recipient, idCounter.current());
    alienStrengths[idCounter.current()] = 0;
    //
    uint256 requestId = requestRandomness(
      100000, // callbackGasLimit,
      3, // requestConfirmations,
      1 // numWords
    );
    vrfRequests[requestId] = idCounter.current();
    idCounter.increment();
  }

  /**
   * @dev Allow withdraw from the contract
   */
  function claimFunds(address payable recipient) public onlyOwner {
    recipient.transfer(address(this).balance);
  }

  /**
   * @dev Allow withdraw of Link tokens from the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(linkAddress);
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      'Unable to transfer'
    );
  }

  /**
   * @dev See {IERC721-setBaseUri}.
   */
  function setBaseUri(string memory _baseUri) public onlyOwner {
    baseUri = _baseUri;
  }

  /**
   * @dev See {IERC721-_baseURI}.
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseUri;
  }

  /**
   * @dev See {IERC721-_beforeTokenTransfer}.
   */
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  /**
   * @dev See {IERC721-isApprovedForAll}.
   */
  function isApprovedForAll(
    address owner,
    address operator
  ) public view virtual override returns (bool) {
    if (operator == battlefieldEarthAddress) {
      return true;
    }
    return super.isApprovedForAll(owner, operator);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  receive() external payable {}

  fallback() external payable {}
}
