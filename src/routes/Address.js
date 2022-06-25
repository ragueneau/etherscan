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

    const get_account_txlist1 = async (addr) => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        //get addr balance
        const balance = await provider.getBalance(addr)


        setLoading(false)
    }
    // ---------------------------------------------------------------------------------------------------------------------------- //
    const getAddressTokenList = async (addr) => {

    }

    // ---------------------------------------------------------------------------------------------------------------------------- //
    const getOnChainAddressInfo = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const _balance = await provider.getBalance(params.walletAddress)

        //get account balance in ether
        const balance = ethers.utils.formatEther(_balance)

        const transactions = await provider.getTransactionCount(params.walletAddress)
    
        //get transactions for address
        //const transaction = await provider.getTransaction(params.walletAddress)
        //console.log(transaction)


        setAddress({
            address: params.walletAddress,
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
            //console.log(params.walletAddress,address.address)

        }, 1000);

        return () => clearTimeout(timer)
    });

    //if params changes, reload page

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h4 className="Address">Address: {getAddress(params.walletAddress)}</h4>
                <Spinner animation="border" variant="primary" />
      </main>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <main style={{ padding: "1rem 0" }}>

                <h4 className="Address">Address: {getAddress(params.walletAddress)}</h4>

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
            </main>
    );
}
export default Address