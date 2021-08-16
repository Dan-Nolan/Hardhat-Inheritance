//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    uint public x = 3;

    function changeNumber(uint _x) external onlyOwner {
        x = _x;
    }
}
