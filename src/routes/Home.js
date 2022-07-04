import Config from '../config.json'

import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Col, Row, Spinner } from 'react-bootstrap'

import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'
import Dashboard from '../components/Dashboard'
import Dashboard2 from '../components/Dashboard2'

import SearchBar from '../components/SearchBar'

const axios = require('axios').default;

const Home = ({ networkName, account }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])

    const [txs, setTxs] = useState([])
    const [pendingTxs, setPendingTxs] = useState([])
    const [lastBlock, setLastBlock] = useState(0)
    const [pendingBlocks, setPendingBlocks] = useState([])

    const [searchValue, setSearchValue] = useState('')
    const [searchFilter, setSearchFilter] = useState('all')
    const [searchAccount, setSearchAccount] = useState('')

    const getLatestTransactions = async () => {
        await axios.get(Config.restAPI + '/api?module=proxy&action=eth_blockNumber&apikey=' + Config.ApiKeyToken)
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

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const blockNumber = await provider.getBlockNumber()

        if ( lastBlock === 0) {
            setLastBlock(blockNumber - 11)

        } else {
            if ( lastBlock < blockNumber ) {
                for (let i = lastBlock+1; i < blockNumber; i++) {

                    const block = await provider.getBlock(i+1)

                    //skip if block is in items
                    if ( items.find(item => item.number === block.number) ) {
                        continue
                    }

                    setLastBlock(i)

                    //block exec time
                    let lastTS = 0
                    if (items.length > 0) {
                        lastTS = items[0].timestamp || 0
                    } else {
                        const lblock = await provider.getBlock(i)
                        lastTS = lblock.timestamp
                    }
                    block.duration = block.timestamp - lastTS
                    items.unshift(block)

                    // remove oldest item if we have more than 10 items
                    if (items.length > 10) {
                        items.pop()
                    }
                }


                //for each item is items echo to console
                items.forEach(item => {
                    item.timediff = Math.round(+new Date()/1000) - item.timestamp
                })

                setItems(items)
            }
        }
    }






    const getLatest = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }


        const blockNumber = await provider.getBlockNumber()

        //console.log(blockNumber)


       //console.log('new get latest', blockNumber)

        if ( lastBlock === 0) {
            if ( blockNumber > 10 ) {
                setLastBlock(blockNumber - 11)
            } else {
                setLastBlock(-1)
            }
        } else {
            if ( lastBlock < blockNumber ) {
                for (let i = lastBlock+1; i < blockNumber; i++) {

                    const block = await provider.getBlock(i+1)

                    //skip if block is in items
                    if ( items.find(item => item.number === block.number) ) {
                        continue
                    }

                    setLastBlock(i)

                    // if block has transactions, get them
                    if (block.transactions.length > 0) {
                        block.transactions.forEach(async (tx) => {

                            //if tx is not in txs, add it
                            if ( txs.length === 0 || (!txs.find(item => item.hash === tx) )) {

                                const txData = await provider.getTransactionReceipt(tx)
                                //txData.method = txData.data.slice(0, 10)
                                txData.hash = tx
                                txData.value = parseInt(txData.value)
                                txData.receipt = {
                                    status: txData.status,
                                    gasUsed: parseInt(txData.gasUsed).toString()
                                }
                                txs.unshift(txData)

                                //if txs is more than 10, remove oldest
                                if (txs.length > 10) {
                                    txs.pop()
                                }

                                setTxs(txs)
                            }
                        })

                    }


                    //block exec time
                    let lastTS = 0
                    if (items.length > 0) {
                        lastTS = items[0].timestamp || 0
                    } else {
                        const lblock = await provider.getBlock(i)
                        lastTS = lblock.timestamp
                    }
                    block.duration = block.timestamp - lastTS
                    items.unshift(block)

                    // remove oldest item if we have more than 10 items
                    if (items.length > 10) {
                        items.pop()
                    }
                }


                //for each item is items echo to console
                items.forEach(item => {
                    item.timediff = Math.round(+new Date()/1000) - item.timestamp
                })

                setItems(items)
            }
        }
    }


    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);

            getLatest()

            if (networkName === 'CoeptIX' && txs.length === 0) {
                getLatestTransactions()
            }

            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })

    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h2>Loading the latest blocks...</h2>
            <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h2>EVM Blockchain Explorer</h2>

            <SearchBar />
            {networkName === 'CoeptIX' ?
            <Row>
                <Col md={4}>
                    <Dashboard items={items} />
                </Col>
                <Col md={4}>
                    <Dashboard2 items={items} />
                </Col>
                <Col md={4}>
                    <Dashboard items={items} />
                </Col>
            </Row>
            : null}
            <div className="mt-3">
                <Row >
                    <Col xs={12} md={12} lg={6} xl={6}>
                        <LatestBlocks items={items} />
                    </Col>
                    <Col xs={12} md={12} lg={6} xl={6}>
                        <LatestTransactions txs={txs} />
                    </Col>
                </Row>
            </div>
        </main>
    );
}
export default Home