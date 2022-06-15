import Config from '../config.json'

import { ethers } from "ethers"

// -=< React.Component >=- ------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"

// -=< Components >=- ------------------------------------------------------------------------------------------------------ //
import AddressOverview from '../components/AddressOverview'
import AddressMoreInfo from '../components/AddressMoreInfo'
import AddressTxTable from '../components/AddressTxTable'
import ContractOverview from '../components/ContractOverview'
import ContractMoreInfo from '../components/ContractMoreInfo'

// ---------------------------------------------------------------------------------------------------------------------------- //
const Address = ({ networkName }) => {
    let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

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

    //function copy address to clipboard
    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

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

    const isContract = async (addr) => {

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

    }

    const getAddressTokenList = async (addr) => {

    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            //getOnChainAddressInfo()
            if (params.walletAddress !== address.address) {
                console.log('address changed')
                setLoading(true)
            }

            get_account_balance(params.walletAddress)
            get_account_txlist(params.walletAddress)
            isContract(params.walletAddress)
            getAddressTokenList(params.walletAddress)

        }, 1000);

        return () => clearTimeout(timer)
    });

    //if params changes, reload page

    if (loading) return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
            <h5>Address {params.walletAddress} <span onClick={() => copyToClipboard(params.walletAddress)}>{copyIcon}</span></h5>
                <Spinner animation="border" variant="primary" />
            </div>
      </div>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Address {params.walletAddress} <span onClick={() => copyToClipboard(params.walletAddress)}>{copyIcon}</span></h5>

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