
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Spinner } from 'react-bootstrap'

import LatestBlocks from './blocks/LatestBlocks'
import LatestTransactions from './tx/LatestTransactions'

const axios = require('axios').default;


const Home = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [txs, setTxs] = useState([])

    const getLatestTransactions = async () => {
        //const response = await axios.get('http://api.etherscan.io/api?module=account&action=txlist&address=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken')

        const response = await axios.get('https://etherapi.coeptix.net/tx')
        .then(function (response) {
          // handle success
          //console.log(response);
          setTxs(response.data.msg)
        })
        .catch(function (error) {
         // handle error
          console.log(error);
        })
       .then(function () {
          // always executed
        });

        //console.log('getLatestTransactions')

        //block.timediff = Math.round(+new Date()/1000) - block.timestamp
       // console.log(response)

        //setTxs(response.data.msg)
    }

    //get last block number
    const getLatestBlocks = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const blockNumber = await provider.getBlockNumber()

        let items = []
        //a for loop to get the last 10 blocks
        for (let i = 0; i < 10; i++) {
            const block = await provider.getBlock(blockNumber - i)

            block.timediff = Math.round(+new Date()/1000) - block.timestamp
            items.push(block)
        }

        setItems(items)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getLatestBlocks()
            getLatestTransactions()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading the latest blocks...</h2>
            <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
      <div className="flex justify-center">
        <div className="px-5 py-3 container">
            <h3>EVM Blockchain Scanner</h3>
            <Row className="justify-content-center">
                <LatestBlocks items={items} />
                <LatestTransactions txs={txs} />
            </Row>
        </div>
      </div>
    );
}
export default Home