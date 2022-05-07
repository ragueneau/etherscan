import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import LatestTransactions from '../components/LatestTransactions'
import TransactionsTable from '../components/TransactionsTable'
import Config from '../config.json'

const axios = require('axios').default;

const Address = ({ networkName }) => {
    const [count, setCount] = useState(0)
    const [txs, setTxs] = useState([])

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({
        address: params.address,
        balance: 0,
        value: 0,
        txs: []
    })

    const getAddressLatestTransactions = async (addr) => {

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

    const getProxyAddressInfo = async (addr) => {
        const apicall = Config.restAPI + '/api?module=account&action=balance&address=' + addr + '&tag=latest&apikey=' + Config.ApiKeyToken

        const response = await axios.get(apicall)
        .then(function (response) {
            setAddress({
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

        setLoading(false)
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

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            //getOnChainAddressInfo()
            getProxyAddressInfo(params.walletAddress)
            getAddressLatestTransactions(params.walletAddress)
        }, 900);

          return () => clearTimeout(timer)
          },[count]);
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h4>Loading address: {params.walletAddress}</h4>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Address {params.walletAddress}</h5>
                <Row className="justify-content-center">
                    <Col xs={1} md={6} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Overview</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li className="list-group-item"><b>Balance</b>: {address.balance} eth</li>
                                        <li className="list-group-item"><b>eth Value</b>: ${address.value}</li>
                                        <li className="list-group-item"><b>Token</b>: {address.tokens}</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={1} md={6} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>More Info</Card.Title>
                                <Card.Text>
                                <ul>
                                    <li className="list-group-item"></li>
                                    <li className="list-group-item"></li>
                                    <li className="list-group-item"></li>
                                </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={1} md={10} lg={12}>
                        <h5>Transactions</h5>
                        <TransactionsTable txs={txs} walletAddress={params.walletAddress}/>
                    </Col>

                </Row>

            </div>
        </div>
    );
}
export default Address