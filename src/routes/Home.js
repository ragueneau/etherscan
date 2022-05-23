import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Col, Row, Spinner } from 'react-bootstrap'

import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'
import Dashboard from '../components/Dashboard'

import Config from '../config.json'
const axios = require('axios').default;

const Home = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [txs, setTxs] = useState([])
    const [lastBlock, setLastBlock] = useState(0)

    const getLatestTransactions = async () => {

        const response = await axios.get(Config.restAPI + '/api?module=proxy&action=eth_blockNumber&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
          // handle success
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

    //subscribe to new blocks with ethers.js
    const getLatestBlocks = async () => {
        const provider = new ethers.providers.JsonRpcProvider(Config.node);
        const blockNumber = await provider.getBlockNumber()

        if (lastBlock === 0) {
            setLastBlock(blockNumber - 11)
        } else {

            for (let i = lastBlock; i < blockNumber; i++) {

                const block = await provider.getBlock(i+1)

                setLastBlock(blockNumber)
                items.unshift(block)
                console.log('added block: ' + block.number, i)

                // remove oldest item if we have more than 10 items
                if (items.length > 10) {
                    console.log('removed item')
                    items.pop()
                }
            }

            //for each item is items echo to console
            items.forEach(item => {
                item.timediff = Math.round(+new Date()/1000) - item.timestamp
            })

            console.log('blocks:',blockNumber,'lastblock:',lastBlock,'nb:',items.length,'items:',items)
            setItems(items)
        }
    }


    //get last block number
    const getLatestBlocks2 = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const blockNumber = await provider.getBlockNumber()

        let items = []
        //a for loop to get the last 10 blocks
        for (let i = 0; i < 10; i++) {
            const block = await provider.getBlock(blockNumber - i)

            block.timediff = Math.round(+new Date()/1000) - block.timestamp
            items.push(block)
        }

        console.log('blocks:',items)
        setItems(items)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getLatestBlocks()
            getLatestTransactions()
            setLoading(false)
        }, 1000);
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
            <h3>EVM Blockchain Explorer</h3>
            <Row>
                <Dashboard items={items} />
            </Row>
            <Row >
                <Col xs={12} md={12} lg={6}>
                    <h5>Latest Blocks</h5>
                    <LatestBlocks items={items} />
                </Col>
                <Col xs={12} md={12} lg={6} >
                    <h5>Latest Transactions</h5>
                    <LatestTransactions txs={txs} />
                </Col>
            </Row>
        </div>
      </div>
    );
}
export default Home