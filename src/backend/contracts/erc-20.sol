// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import './ERC20.sol';

contract WETH is ERC20 {
    address public admin;

    constructor() ERC20("CAD Tether", "CADT")
    {
        _mint(msg.sender, 10000 * 10 ** 18);
        admin = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, "only admin");
        _mint(to, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}