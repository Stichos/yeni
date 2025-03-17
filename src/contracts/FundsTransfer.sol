// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundsTransfer {
    address public recipient;
    
    constructor(address _recipient) {
        recipient = _recipient;
    }
    
    function transfer() external payable {
        payable(recipient).transfer(address(this).balance);
    }
    
    receive() external payable {
        payable(recipient).transfer(msg.value);
    }
}
