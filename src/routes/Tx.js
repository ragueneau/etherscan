import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ethers } from "ethers"
import { useParams } from "react-router-dom";

import Transaction from '../components/Transaction'
import TransactionLogs from '../components/TransactionLogs'

const axios = require('axios').default;

const Tx = ({ networkName, transactionHash }) => {
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

    const getTransaction = async (_txHash) => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const tx = await provider.getTransaction(_txHash)
        tx.receipt = await provider.getTransactionReceipt(_txHash)
        tx.input = tx.data

        tx.block = await provider.getBlock(tx.blockNumber)
        tx.block.timediff = Math.round(+new Date()/1000) - tx.block.timestamp

        const date = new Date(tx.block.timestamp * 1000)
        tx.block.humandate = date.toString()

        //console.log(tx)

        setTransaction(tx)
        setLoading(false)
    }

    const getTxMongo = async (_txHash) => {
        const apicall = Config.restAPI + '/api?module=proxy&action=eth_getTransactionByHash&txhash=' + _txHash + '&apikey=' + Config.ApiKeyToken
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

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
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

            getTransaction(params.transactionHash)
            //getTxMongo(params.transactionHash)

        }, 1000);
        return () => clearTimeout(timer)
      }, [ params.transactionHash ])

      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Transaction Details</h4>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    Loading transaction...
                    <Spinner animation="border" variant="secondary" />
                </Col>
            </Row>
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Transaction Details</h4>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <Transaction transaction={transaction} />
                    <br/>
                    {transaction.receipt ? (
                        <TransactionLogs transaction={transaction} />
                    ) : null}
                </Col>
            </Row>
        </main>
    );
}
export default Tx