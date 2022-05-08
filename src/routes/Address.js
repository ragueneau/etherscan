import Config from '../config.json'

//import { get_account_balance } from '../class/Etherscan'

import { ethers } from "ethers"

// -=< React.Component >=- ------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"

// -=< Components >=- ------------------------------------------------------------------------------------------------------ //
import AddressOverview from '../components/AddressOverview'
import AddressMoreInfo from '../components/AddressMoreInfo'
import AddressTxTable from '../components/AddressTxTable'
import ContractOverview from '../components/ContractOverview'
import ContractMoreInfo from '../components/ContractMoreInfo'

// ---------------------------------------------------------------------------------------------------------------------------- //
const Address = ({ networkName }) => {

    // -=< Variables >=- ------------------------------------------------------------------------------------------------------ //
    const axios = require('axios').default;

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


    const getOnChainAddressInfo = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const address = await provider.getBalance(params.walletAddress)

        //get account balance in ether
        const balance = ethers.utils.formatEther(address)

        //const transactions = await provider.getTransactionCount(params.walletAddress)

        setAddress({
            address: address,
            balance: balance,
            value: 0.00
        })

        setLoading(false)
    }

    //a function to verify with ethers.js if the address is a wallet of a contract
    const isContract = async (addr) => {

        const apicall = Config.restAPI + '/api?module=contract&action=iscontract&address=' + addr + '&apikey=' + Config.ApiKeyToken

        const response = await axios.get(apicall)
        .then(function (response) {
            setContract(response.data.result)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            //getOnChainAddressInfo()
            if (params.walletAddress !== address.address) {
                setLoading(true)
                console.log(params.walletAddress)
                console.log(address.address)
            }

            get_account_balance(params.walletAddress)
            get_account_txlist(params.walletAddress)
            isContract(params.walletAddress)

            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    });

      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h4>Loading address: {params.walletAddress}</h4>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )
      // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Address {params.walletAddress}</h5>
                <Row className="justify-content-center">
                    <Col xs={2} md={6} lg={6}>
                        {contract ? (
                            <ContractOverview address={address} />
                        ) : (
                            <AddressOverview address={address} />
                        )}
                    </Col>
                    <Col xs={2} md={6} lg={6}>
                    {address.isContract ? (
                        <ContractMoreInfo address={address} />
                    ) : (
                        <AddressMoreInfo address={address} />
                    )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} md={12} lg={12}>
                        <h5>Transactions</h5>
                        <AddressTxTable txs={txs} walletAddress={params.walletAddress}/>
                    </Col>

                </Row>
            </div>
        </div>
    );
}
export default Address