
import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Card, Row, Col, Spinner } from 'react-bootstrap'

import LatestBlocksExtented from '../components/LatestBlocksExtented'

const axios = require('axios').default;

const Blocks = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [txs, setTxs] = useState([])
    const [lastBlock, setLastBlock] = useState(0)

    //subscribe to new blocks with ethers.js
    const getLatestBlocks = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const blockNumber = await provider.getBlockNumber()

        if ( lastBlock === 0) {
            setLastBlock(blockNumber - 26)

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
                    if (items.length > 25) {
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

    // Use Effect ---------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {

            getLatestBlocks()

            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer)
    })

    // Render ---------------------------------------------------------------------------------------------------------- //
    if (loading) {
        return (
            <main style={{ padding: "1rem 0" }} className='app-body'>
                <h4 className="Title">Latest Blocks</h4>
                Loading... <br/><Spinner animation="border" variant="secondary" />
            </main>
        )
    } else {
        return (
            <main style={{ padding: "1rem 0" }} className='app-body'>
                <h4 className="Title">Latest Blocks</h4>
                <Row >
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <LatestBlocksExtented items={items} />
                    </Col>
                </Row>
            </main>
        );
    }
}
export default Blocks