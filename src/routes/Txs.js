import Config from '../config.json'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
//import { Link } from "react-router-dom";

import TransactionList from '../components/TransactionList'

const axios = require('axios').default;

const Txs = ({ networkName, blockNumber }) => {
    const [count, setCount] = useState(0);
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [blockContent, setTxsContent] = useState([{
        blockNumber: 1,
        blockHash: '',
        blockTransactions: [],
    }])

    // ---------------------------------------------------------------------------------------------------------- //
    const eth_getTransactionByBlockNumber = async () => {

        const apicall = Config.restAPI + '/api?module=proxy&action=eth_getTransactionByBlockNumber&blockNumber=' + params.blockNumber + '&startblock=0&endblock=999999999&sort=asc&apikey=' + Config.ApiKeyToken
        await axios.get( apicall )
        .then(function (response) {
          // handle success
          setTxsContent(response.data.result)
        })
        .catch(function (error) {
         // handle error
          console.log(error);
        })
       .then(function () {
          // always executed
        });
    }

    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            eth_getTransactionByBlockNumber()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Transactions</h5>
          Loading transaction for block #{params.blockNumber}
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
              <h5>Transactions</h5>
              For block #{params.blockNumber}
              <TransactionList txs={blockContent} />
              A total of {blockContent.length} transaction(s) found.
            </div>
        </div>
    );
}
export default Txs