
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { axios } from 'axios'

import LatestBlocks from './blocks/LatestBlocks'
import LatestTransactions from './tx/LatestTransactions'

const Home = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [lastBlockNumber, setLastBlockNumber] = useState()
    const [items, setItems] = useState([])
    //const [timestamp, setTimestamp] = useState()

    //const [account, setAccount] = useState([])

    //get last block number
    const getLatestBlocks = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const blockNumber = await provider.getBlockNumber()
        console.log('Last block number:', blockNumber)

        //setTimestamp(Math.round(+new Date()/1000))

        let items = []

        //a for loop to get the last 10 blocks
        for (let i = 0; i < 10; i++) {
            const block = await provider.getBlock(blockNumber - i)
            //console.log('Block:', block)

            block.timediff = Math.round(+new Date()/1000) - block.timestamp

            items.push(block)

        }

        setItems(items)
        setLastBlockNumber(blockNumber)

        setLoading(false)
    }

    useEffect(() => {
        getLatestBlocks()

        let timer = setTimeout(() => {
            setCount((count) => count + 1);
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
            <h3>EVM Blockchain Scanner</h3>
            <Row className="justify-content-center">
                <LatestBlocks items={items} />
                <LatestTransactions />
            </Row>
        </div>
      </div>
    );
}
export default Home