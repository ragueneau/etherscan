
import axios from 'axios'
import { ethers } from "ethers"
import config from '../config.json'

export function getProxyAddressInfo(addr) {

    return new Promise((resolve, reject) => {
        const apicall = config.restAPI + '/api?module=account&action=balance&address=' + addr + '&tag=latest&apikey=' + config.ApiKeyToken

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
