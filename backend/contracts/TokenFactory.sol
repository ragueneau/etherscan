// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// - Token Factory contract --------------------------------------------------------------
contract TokenFactory {
    //a public array to store the tokens addresses
    ERC20[] public tokens;
    // total number of tokens
    uint public totalTokens;
    //map to store the token index for each token address
    mapping (address => uint) public tokenIndex;
    //map to store the token address for each token index
    mapping (uint => address) public tokenAddress;
    //map to store the token name for each token index
    mapping (uint => string) public tokenName;
    //map to store the token symbol for each token index
    mapping (uint => string) public tokenSymbol;
    //map to store the token decimals for each token index
    mapping (uint => uint) public tokenDecimals;

    function createToken(
        string memory name_,
        string memory symbol_,
        bool isBurnable_,
        bool isMintable_,
        bool isWrappable_,
        bool isFreezable_,
        bool isFixedSupply_,
        uint initialSupply_
    ) external {
        Token token = new Token(name_, symbol_, isBurnable_, isMintable_, isWrappable_, isFreezable_, isFixedSupply_, initialSupply_);
        tokens.push(token);
        totalTokens++;

        // Token data //
        tokenIndex[address(token)] = totalTokens - 1;
        tokenName[totalTokens - 1] = name_;
        tokenSymbol[totalTokens - 1] = symbol_;
        tokenDecimals[totalTokens - 1] = token.decimals();
        tokenAddress[totalTokens - 1] = address(token);
    }

    function getToken(uint index_) external view returns(ERC20) {
        return tokens[index_];
    }

    function getTotalTokens() external view returns(uint) {
        return totalTokens;
    }

    // function getTokenName(uint memory index_) external view returns(string) {
    //     return tokens[index_].name;
    // }

    // function getTokenSymbol(address token_) external view returns(string) {
    //     uint _index = tokenIndex[address(token_)];
    //     return tokenSymbol[_index];
    // }

    function getTokenBalance(address account_) external view returns(uint) {
        uint balance = 0;
        for (uint i = 0; i < totalTokens; i++) {
            balance += tokens[i].balanceOf(account_);
        }
        return balance;
    }

    function getTokenTotalSupply(uint index_) external view returns(uint) {
        return tokens[index_].totalSupply();
    }

    function getTokenDecimals(uint index_) external view returns(uint) {
        return tokens[index_].decimals();
    }

    function getTokenAllowance(address account_, address spender_) external view returns(uint) {
        uint allowance = 0;
        for (uint i = 0; i < totalTokens; i++) {
            allowance += tokens[i].allowance(account_, spender_);
        }
        return allowance;
    }

    function registerToken(address token_) external {
        ERC20 token = ERC20(token_);
        tokens.push(token);
        totalTokens++;
    }

    function getTokenIndex(address token_) external view returns(uint) {
        return tokenIndex[token_];
    }

    // function setMintable(address token_, bool isMintable_) external {
    //     ERC20 token = ERC20(token_);
    //     token.mintable(isMintable_);
    // }
}

// - Token Contract ----------------------------------------------------------------------------
contract Token is ERC20 {
    address public admin;
    bool public isRegistered;
    bool isMintable;
    bool isBurnable;
    bool isWrappable;
    bool isFreezable;
    bool public isFixedSupply;
    uint public initialSupply;

    //custom ERC20 constructor to create a new token
    constructor(
        string memory name_,
        string memory symbol_,
        bool isMintable_,
        bool isBurnable_,
        bool isWrappable_,
        bool isFreezable_,
        bool isFixedSupply_,
        uint initialSupply_
    ) ERC20(name_, symbol_)
    {
        admin = msg.sender;
        isRegistered = true;
        isMintable = isMintable_;
        isBurnable = isBurnable_;
        isWrappable = isWrappable_;
        isFreezable = isFreezable_;
        isFixedSupply = isFixedSupply_;

        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply_);
        }

        if (isFixedSupply_) {
            initialSupply = initialSupply_;
        } else {
            initialSupply = 0;
        }


    }

    // Events ------------------------------------------------------------------------------
    event Burn(address sender, uint value);
    event Mint(address sender, uint value);

    // Modifier functions ------------------------------------------------------------------
    modifier adminOnly {
        require(msg.sender == admin);
        _;
    }

   // Admin functions ---------------------------------------------------------------------
    function setAdmin(address newAdmin) external adminOnly {
        admin = newAdmin;
    }
    function setMintable(bool isMintable_) external adminOnly {
        isMintable = isMintable_;
    }
    function setWrappable(bool isWrappable_) external adminOnly {
        isWrappable = isWrappable_;
    }
    function setBurnable(bool isBurnable_) external adminOnly {
        isBurnable = isBurnable_;
    }

    // User Functions ---------------------------------------------------------------------
    receive() external payable {
        if (isWrappable) {
            if (isMintable) {
                _mint(msg.sender, msg.value);
                emit Mint(msg.sender, msg.value);
            } else {
                revert("Token is not mintable");
            }
        } else {
            revert("ERC20: transfer() is not supported");
        }
    }

    function burn(uint amount) external {
        if (isBurnable) {
            _burn(msg.sender, amount);
            emit Burn(msg.sender, amount);
        } else {
            revert("Token is not burnable");
        }
    }

}