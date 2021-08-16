//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

     modifier onlyOwner {
        require(msg.sender == owner, "not an owner!");
        _;
    }
}
