import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ethers } from "ethers"
import { useParams } from "react-router-dom";

import Transaction from '../components/Transaction'
import TransactionLogs from '../components/TransactionLogs'

const axios = require('axios').default;

const Tx = ({ networkName, transactionHash }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [txlogs, setTxlogs] = useState(null)
    const [transaction, setTransaction] = useState(
        {
            transactionHash: params.transactionHash,
            blockNumber: 0,
            blockHash: '',
            from: '',
            to: '',
            value: 0,
            gas: 0,
            gasPrice: 0,
            gasUsed: 0,
            input: '',
            block: {
                timediff: 0
            }
        }
    )

    const getTransaction = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (accounts.length > 0) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const tx = await provider.getTransaction(params.transactionHash)
        tx.receipt = await provider.getTransactionReceipt(params.transactionHash)
        tx.input = tx.data

        tx.block = await provider.getBlock(tx.blockNumber)
        tx.block.timediff = Math.round(+new Date()/1000) - tx.block.timestamp

        const date = new Date(tx.block.timestamp * 1000)
        tx.block.humandate = date.toString()


        console.log(tx)

        setTransaction(tx)
    }

    const getTxMongo = async () => {
        const apicall = Config.restAPI + '/api?module=proxy&action=eth_getTransactionByHash&txhash=' + params.transactionHash + '&apikey=' + Config.ApiKeyToken
        let tx
        const response = await axios.get( apicall )
        .then(function (response) {
            tx = response.data.result
        })
        .catch(function (error) {
         // handle error
          console.log(error);
        })
       .then(function () {
          // always executed
        });

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (accounts.length > 0) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        tx.block = await provider.getBlock(tx.blockNumber)
        tx.block.timediff = Math.round(+new Date()/1000) - tx.block.timestamp
        //get latest block number
        const blockNumber = await provider.getBlockNumber()
        tx.block.blockNumber = blockNumber
        //get block confirmations
        tx.confirmations = blockNumber - tx.blockNumber

        const date = new Date(tx.block.timestamp * 1000)
        tx.block.humandate = date.toString()

        setTransaction(tx)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getTransaction()
            //getTxMongo()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
      })
      if (loading) return (
        <div className="flex">
            <div className="px-5 py-3 container text-left">
            <h5>Transaction Details</h5>
            Loading transaction...
            </div>
            <div className="px-5 py-3 container text-left">
            <Spinner animation="border" variant="secondary" />
            </div>
        </div>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Transaction Details</h5>
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12}>
                        <Transaction transaction={transaction} />
                        <TransactionLogs transaction={transaction} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Tx