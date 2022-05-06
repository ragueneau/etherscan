// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract faucet {

    //state variable to keep track of owner and amount of ETHER to dispense
    address public owner;
    uint public amountAllowed = 5000000000000000000;

    //mapping to keep track of requested tokens
    //Address and blocktime + 1 day is saved in TimeLock
    mapping(address => uint) public lockTime;

    //constructor to set the owner
	constructor() payable {
		owner = msg.sender;
	}

    //function modifier
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    //function to change the owner.  Only the owner of the contract can call this function
    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    //function to set the amount allowable to be claimed. Only the owner can call this function
    function setAmountallowed(uint newAmountAllowed) public onlyOwner {
        amountAllowed = newAmountAllowed;
    }

    //function to donate funds to the faucet contract
	function donateTofaucet() public payable {
        require(msg.value > 0.000000000000000001 ether);

        //faucet.push(msg.sender);
	}

    //function to send tokens from faucet to an address
    function requestTokens(address payable _requestor) public payable {

        //perform a few checks to make sure function can execute
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");
        require(address(this).balance > amountAllowed, "Not enough funds in the faucet. Please donate");

        //if the balance of this contract is greater then the requested amount send funds
        _requestor.transfer(amountAllowed);

        //updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;
    }

    //get the amount of tokens that are available to be claimed
    function getAvailableTokens() public view returns (uint) {
        return address(this).balance;
    }

}