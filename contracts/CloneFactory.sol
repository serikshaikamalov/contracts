// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ERC721v2.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract CloneFactory {
    address immutable tokenImplementation;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() public {
        tokenImplementation = address(new ERC721v2());
    }

    function createToken(
        string calldata name,
        string calldata symbol,
        string calldata baseURI,
        address extraMinter
    ) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        ERC721v2(clone).initialize(name, symbol, baseURI, extraMinter);
        ERC721v2(clone).grantRole(MINTER_ROLE, msg.sender);
        ERC721v2(clone).grantRole(PAUSER_ROLE, msg.sender);
        if (extraMinter != address(0)) {
            ERC721v2(clone).grantRole(MINTER_ROLE, extraMinter);
        }
        return clone;
    }
}
