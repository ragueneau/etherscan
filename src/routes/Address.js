import Config from '../config.json'

import { getAddress, copyToClipboardButton } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

// -=< Ethers >=------------------------------------------------------------------------------------------------------------ //
import { ethers } from "ethers"

// -=< React.Component >=- ------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { Card, Nav, Row, Col, Spinner } from 'react-bootstrap'
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

    const [txs, setTxs] = useState([])

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({
        address: params.address,
        balance: 0,
        value: 0.00
    })
    const [contract, setContract] = useState(false)
    const [activeTab, setActiveTab] = useState('#tx')
    const [cardbody, setCardbody] = useState('')

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
    const getOnChainAddressInfo = async (_wallet) => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const _balance = await provider.getBalance(_wallet)

        //get account balance in ether
        const balance = ethers.utils.formatEther(_balance)

        const transactions = await provider.getTransactionCount(_wallet)

        //get transactions for address
        //const transaction = await provider.getTransaction(params.walletAddress)
        //console.log(transaction)


        setAddress({
            address: _wallet,
            balance: balance,
            value: 0.00
        })

        if (await isContract(_wallet) === true) {
            setContract(true)
        }

        //getAddressTokenList(_wallet)
        setLoading(false)
    }

    const getAccountInfo = async () => {

        //get account info from the API
        const apicall = Config.restAPI + '/api?module=account&action=balance&address=' + params.address + '&tag=latest&apikey=' + Config.ApiKeyToken
        const response = await axios.get(apicall)
        .then(function (response) {
            setAddress(response.data.result)
        }
        )
    }

    // -=< Effects >=- ------------------------------------------------------------------------------------------------------ //
    useEffect(() => {
        let timer = setTimeout(() => {

            getOnChainAddressInfo(params.walletAddress)
            //getAccountInfo()

            // Transactions Tab //
            if (activeTab === '#tx')  {
                get_account_txlist(params.walletAddress)

                const c = (
                    <AddressTxTable txs={txs} walletAddress={params.walletAddress}/>
                )
                setCardbody(c)

            } else if (activeTab === '#inttx') {
                const c = (
                    <AddressOverview address={address}/>
                )
                setCardbody(c)
            } else if (activeTab === '#int') {
                const c = (
                    <AddressMoreInfo address={address}/>
                )
                setCardbody(c)
            }
            //console.log(params.walletAddress,address.address)

            //console.log(address)
        }, 1000);

        return () => clearTimeout(timer)
    }, [activeTab, params.walletAddress, address, txs, networkName])

    //if params changes, reload page

    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Address {params.walletAddress}{copyToClipboardButton(params.walletAddress)}</h4>
            <Spinner animation="border" variant="primary" />
        </main>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>

                <h4 className="Title">Address {params.walletAddress}{copyToClipboardButton(params.walletAddress)}</h4>

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
                        <Card className="infobox">
                            <Card.Header>
                                <Card.Title><b>Transactions List</b></Card.Title>
                                <Nav variant="tabs" defaultActiveKey="#tx" onSelect={(selectedKey) => setActiveTab(selectedKey)} >
                                    <Nav.Item>
                                        <Nav.Link href="#tx">Transactions</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#inttx">Internal Tx</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#int">Contracts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#disabled" disabled>
                                        Disabled
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                {cardbody}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
    );
}
export default Address