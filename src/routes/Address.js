import Config from '../config.json'

import { getAddress, linkAddress } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

// -=< Ethers >=------------------------------------------------------------------------------------------------------------ //
import { ethers } from "ethers"

// -=< React.Component >=- ------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { Button, Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"

// -=< Components >=- ------------------------------------------------------------------------------------------------------ //
import AddressOverview from '../components/AddressOverview'
import AddressMoreInfo from '../components/AddressMoreInfo'
import AddressTxTable from '../components/AddressTxTable'
import ContractOverview from '../components/ContractOverview'
import ContractMoreInfo from '../components/ContractMoreInfo'

const axios = require('axios').default;

// ---------------------------------------------------------------------------------------------------------------------------- //
const Address = ({ networkName }) => {

    // -=< Variables >=- ------------------------------------------------------------------------------------------------------ //

    const [count, setCount] = useState(0)
    const [txs, setTxs] = useState([])

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({
        address: params.address,
        balance: 0,
        value: 0.00
    })
    const [contract, setContract] = useState(false)

    // -=< Functions >=- ------------------------------------------------------------------------------------------------------ //
    const get_account_txlist = async (addr) => {

        const apicall = Config.restAPI + '/api?module=account&action=txlist&address=' + addr + '&startblock=0&endblock=999999999&sort=asc&apikey=' + Config.ApiKeyToken
        const response = await axios.get(apicall)
        .then(function (response) {
          setTxs(response.data.result)
        })
        .catch(function (error) {
         // handle error
          console.log(error);
        })
       .then(function () {
          // always executed
        });

    }

    // ---------------------------------------------------------------------------------------------------------------------------- //
    const get_account_balance = async (addr) => {
        const apicall = Config.restAPI + '/api?module=account&action=balance&address=' + addr + '&tag=latest&apikey=' + Config.ApiKeyToken

        const response = await axios.get(apicall)
        .then(function (response) {
            setAddress({
                address: addr,
                balance: ethers.utils.formatEther(response.data.result),
                value: 0.00
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    }

    // ---------------------------------------------------------------------------------------------------------------------------- //
    const isContractMongo = async (addr) => {

        const apicall = Config.restAPI + '/api?module=contract&action=iscontract&address=' + addr + '&apikey=' + Config.ApiKeyToken

        const response = await axios.get(apicall)
        .then(function (response) {
            setContract(response.data.result)
            setLoading(false)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

        setLoading(false)
    }

    // ---------------------------------------------------------------------------------------------------------------------------- //
    const getAddressTokenList = async (addr) => {

    }

    // ---------------------------------------------------------------------------------------------------------------------------- //
    const getOnChainAddressInfo = async () => {

        let provider = await getProvider()

        const address = await provider.getBalance(params.walletAddress)

        //get account balance in ether
        const balance = ethers.utils.formatEther(address)

        //const transactions = await provider.getTransactionCount(address)

        //get transactions for address
        //const transactions = await provider.getTransactions(address)
        //console.log(transactions)

        setAddress({
            address: address,
            balance: balance,
            value: 0.00
        })

        if (await isContract(params.walletAddress) === true) {
            setContract(true)
        }

        //getAddressTokenList(params.walletAddress)
        setLoading(false)
    }

    // -=< Effects >=- ------------------------------------------------------------------------------------------------------ //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);

            getOnChainAddressInfo()

            get_account_txlist(params.walletAddress)

        }, 1000);

        return () => clearTimeout(timer)
    });

    //if params changes, reload page

    if (loading) return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
            <h4 className="infobox">Address: {getAddress(params.walletAddress)}</h4>
                <Spinner animation="border" variant="primary" />
            </div>
      </div>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h4 className="infobox">Address: {getAddress(params.walletAddress)}</h4>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6}>
                        {contract ? (
                            <ContractOverview address={address} />
                        ) : (
                            <AddressOverview address={address} />
                        )}
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                    {contract ? (
                        <ContractMoreInfo address={address} />
                    ) : (
                        <AddressMoreInfo address={address} />
                    )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <AddressTxTable txs={txs} walletAddress={params.walletAddress}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Address