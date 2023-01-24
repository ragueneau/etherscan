import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
//import { Link } from "react-router-dom";

import TransactionList from '../components/TransactionList'

//const axios = require('axios').default;

const Txs = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [blockContent, setTxsContent] = useState([])
    const [blockNumber, setBlockNumber] = useState(parseInt(params.blockNumber))

    // ---------------------------------------------------------------------------------------------------------- //
    const eth_getTransactionByBlockNumber = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const block = await provider.getBlock(blockNumber)
        let txs = []

        block.transactions.forEach(async (tx) => {
            const txData = await provider.getTransaction(tx)
            txData.method = txData.data.slice(0, 10)
            txs.push(txData)
        })

        setTxsContent(txs)
    }

    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            if (blockContent.length === 0) {
                setBlockNumber(parseInt(params.blockNumber))
                eth_getTransactionByBlockNumber()
                setLoading(false)
            }

        }, 100);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Transactions</h4>
          Loading transaction for block #{params.blockNumber}
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Transactions</h4>
            For block #{params.blockNumber}
            <TransactionList txs={blockContent} />
            A total of {blockContent.length} transaction(s) found.
        </main>
    );
}
export default Txs