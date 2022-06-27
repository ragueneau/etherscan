import Config from '../config.json'
import { ethers } from "ethers"
//import { getContractFactory } from "ethers-contracts"



// ---------------------------------------------------------------------------------------------------------------------------- //
export async function getProvider() {

    let provider = new ethers.providers.JsonRpcProvider(Config.node);

    //verify if metamask is connected
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    return provider;
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export async function isContract(_address) {

    //verify if the address is a contract from the rpc node
    const provider = await getProvider()
    //get address storage
    const storage = await provider.getStorageAt(_address, 0)
    //get address code
    const code = await provider.getCode(_address)
    //verify if the address is a contract
    if (code !== '0x' && storage !== '0x') {
        return true
    } else {
        return false
    }
}

export async function loadContract2(address, abi) {
    const provider = await getProvider()

    // Get provider from Metamask
    const wallet = provider.getSigner()
    const contract = new ethers.Contract(address, abi, wallet)

    return contract
}

