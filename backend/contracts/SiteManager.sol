// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SiteManager {
    address public siteAdmin;

    // a contract to manager the configuration and authentication of the administrator of the site
    address public contractAdmin;

    constructor() public {
        siteAdmin = msg.sender;
    }

    event SiteAdminChanged(address newAdmin);
    event ContractAdminChanged(address newAdmin);

    modifier onlyOwner {
        require(msg.sender == siteAdmin, "Only owner can call this function.");
        _;
    }

    function setSiteAdmin(address newOwner) public onlyOwner {
        siteAdmin = newOwner;
        emit SiteAdminChanged(newOwner);
    }

}
