import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"

//import { MongoClient } from "mongodb";

//import mongoose from 'mongoose'
//const mongoose = require('mongoose')

const Address = ({ networkName }) => {
    const [count, setCount] = useState(0);

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({
        address: params.address,
        balance: 0,
        value: 0,
        txs: []
    })

    const getAddress2 = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const address = await provider.getBalance(params.walletAddress)
        console.log('Address:', params.walletAddress)

        //get account balance in ether
        const balance = ethers.utils.formatEther(address)
        console.log('Balance:', balance)

        //const HDNode  = await ethers.utils.HDNode.fromMnemonic('boss rural month arm exit elegant eight grain palace biology pistol control outside album slab top boil absorb tree mean street giggle head frozen')

        //setLastBlockNumber(blockNumber)
        // get transactions
        const transactions = await provider.getTransactionCount(params.walletAddress)
        //console.log('Transactions:', transactions)

        //verify erc20 token Balance
        //const erc20 = new ethers.Contract(params.erc20Address, params.erc20ABI, provider)
        //const erc20Balance = await erc20.balanceOf(params.walletAddress)
        //console.log('ERC20 Balance:', erc20Balance)

        //get transactions list from address
        //const txs = await provider.getHistory(params.walletAddress)
        //console.log('Txs:', txs)

        //get the transactions list from the mongodb collection 'transactions'

        //mongoose.connect('mongodb://192.168.2.125:27017/geth', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        //    if (err) {
        //        console.log('Error:', err)
        //    } else {
        //        console.log('Connected to MongoDB')
        //    }
                //})
        //get last block number
    }

    const getAddress = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const address = await provider.getBalance(params.walletAddress)

        //get account balance in ether
        const balance = ethers.utils.formatEther(address)

        const transactions = await provider.getTransactionCount(params.walletAddress)

        setAddress({
            address: address,
            balance: balance,
            value: 0.00,
            txs: [],
            transactions: transactions,
            tokens: []
        })

        setLoading(false)
    }

    useEffect(() => {

        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getAddress()
        }, 950);

          return () => clearTimeout(timer)
          })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h4>Loading address: {params.walletAddress}</h4>
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
                                        <li className="list-group-item"><b>Balance</b>: {address.balance} xETH</li>
                                        <li className="list-group-item"><b>xETH Value</b>: ${address.value}</li>
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
                        <Card>
                            <Card.Body>
                                <Card.Title>Transactions</Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Transactions</i>: {address.transactions}
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </div>
        </div>
    );
}
export default Address