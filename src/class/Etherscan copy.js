
import axios from 'axios'
import { ethers } from "ethers"

//create new class Etherscan
class Etherscan {
    constructor(config) {
        this.config = config;
    }
    //get the balance of an address
    getBalance(address) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=balance&address=' + address + '&tag=latest&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(ethers.utils.formatEther(response.data.result))
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactions(address) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txlist&address=' + address + '&tag=latest&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }



    //get the transactions of an address
    getTransaction(txHash) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=tx&txhash=' + txHash + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactionReceipt(txHash) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txreceipt&txhash=' + txHash + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactionByBlock(blockNumber) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txlist&blockNumber=' + blockNumber + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactionByBlockNumber(blockNumber) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txlist&blockNumber=' + blockNumber + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactionByBlockNumberAndAddress(blockNumber, address) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txlist&blockNumber=' + blockNumber + '&address=' + address + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }
    //get the transactions of an address
    getTransactionByBlockNumberAndAddressAndTag(blockNumber, address, tag) {
        return new Promise((resolve, reject) => {
            const apicall = this.config.restAPI + '/api?module=account&action=txlist&blockNumber=' + blockNumber + '&address=' + address + '&tag=' + tag + '&apikey=' + this.config.ApiKeyToken
            axios.get(apicall)
                .then(function (response) {
                    resolve(response.data.result)
                }
                )
                .catch(function (error) {
                    reject(error)
                }
                )
                .then(function () {
                    // always executed
                }
                );
        })
    }


    getProxyAddressInfo(addr) {
        return new Promise((resolve, reject) => {

            const apicall = this.config.restAPI + '/api?module=account&action=balance&address=' + addr + '&tag=latest&apikey=' + this.config.ApiKeyToken

            const response = axios.get(apicall)
            .then(function (response) {
                resolve(response.data.result)
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
            .then(function () {
                // always executed
            });
        })
    }
}
//module.exports = Etherscan;

export default Etherscan;