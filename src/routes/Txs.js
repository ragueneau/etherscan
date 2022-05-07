import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
//import { Link } from "react-router-dom";
import Config from '../config.json'

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
    const getBlockTransactions = async () => {

        const apicall = Config.restAPI + '/api?module=proxy&action=eth_getTransactionByBlockNumber&blockNumber=' + params.blockNumber + '&startblock=0&endblock=999999999&sort=asc&apikey=' + Config.ApiKeyToken
        const response = await axios.get( apicall )
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
            getBlockTransactions()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Loading transaction for block #{params.blockNumber}</h5>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
              <h5>Transactions</h5>
              For block #{params.blockNumber}
              <Card>
                <Card.Body>
                    <Card.Text>
                        A total of {blockContent.length} transaction(s) found.
                    </Card.Text>
                    <TransactionList txs={blockContent} />
                </Card.Body>
              </Card>
            </div>
        </div>
    );
}
export default Txs