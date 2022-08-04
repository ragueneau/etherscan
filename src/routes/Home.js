import Config from '../config.json'

import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Col, Row, Spinner } from 'react-bootstrap'

import SearchBar from '../components/SearchBar'
import Dashboard from '../components/Dashboard'

import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'

const axios = require('axios').default;

const Home = ({ networkName, account }) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])

    const [txs, setTxs] = useState([])
    const [pendingTxs, setPendingTxs] = useState([])
    const [lastBlock, setLastBlock] = useState(0)
    const [pendingBlocks, setPendingBlocks] = useState([])

    const [searchValue, setSearchValue] = useState('')
    const [searchFilter, setSearchFilter] = useState('all')
    const [searchAccount, setSearchAccount] = useState('')

    const [stats, setStats] = useState({
        dailytxnfee: 0,
        dailynetutilization: 0,
        avgdifficulty: 0,
        avgtxnperblock: 0,
        avgtxnperday: 0,
        avgtxnperhour: 0,
        avgtxnperminute: 0
    })

    const getLatestTransactions = async () => {
        await axios.get(Config.restAPI + '/api?module=proxy&action=eth_blockNumber&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
          // handle success
          setTxs(response.data.result)
        })
        .catch(function (error) {
         // handle error
          //console.log(error);
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

    const getStats = async () => {
        let stats = {}
        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate,
            dailytxnfee: 0,
            dailynetutilization: 0,
            avgdifficulty: 0,
            avgtxnperblock: 0,
            avgtxnperday: 0,
            avgtxnperhour: 0,
            avgtxnperminute: 0
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=dailytxnfee&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailytxnfee = response.data.result[0].transactionfee_eth
            } else {
                stats.dailytxnfee = 0
            }
        })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailynewaddress&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            //get the firtst address
            if (response.data.result[0]) {
                stats.dailynewaddress = response.data.result[0].newaddresscount
            } else {
                stats.dailynewaddress = 0
            }
        })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailynetutilization&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailynetutilization = response.data.result[0].networkutilization
            } else {
                stats.dailynetutilization = 0
            }
        })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailyavggaslimit&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailyavggaslimit = response.data.result[0].avglimit
            } else {
                stats.dailyavggaslimit = 0
            }

            })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailyavggasprice&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailyavggasprice = response.data.result[0].avggaspricewei
            } else {
                stats.dailyavggasprice = 0
            }

        })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailyavggasprice&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailyavggasprice = response.data.result[0].avggaspricewei
            } else {
                stats.dailyavggasprice = 0
            }
        })

        await axios.get(Config.restAPI + '/api?module=stats&action=dailygasused&static=1&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            if ( response.data.length > 0 ) {
                stats.dailygasused = response.data.result[0].gasused
            } else {
                stats.dailygasused = 0
            }
        })

        setStats(stats)
    }



    useEffect(() => {
        let timer = setTimeout(() => {

            getLatest()
            if (networkName === 'CoeptIX' && txs.length === 0) {
                getLatestTransactions()
            }

            if (stats.dailytxnfee === 0) {
                getStats()
            }

        }, 1000);
        return () => clearTimeout(timer)
    })
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h2>EVM Blockchain Explorer</h2>

            {/* Search Bar */}
            <SearchBar />

            {/* Stats */}
            {networkName === 'CoeptIX' ? <Dashboard stats={stats} /> : null}

            {/* Blocks & Transactions */}
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