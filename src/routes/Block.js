import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import Config from '../config.json'

import BlockInfo from '../components/BlockInfo'
import TransactionList from '../components/TransactionList'

const Block = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const blockNumber = parseInt(params.blockNumber)
    const [txsContent, setTxsContent] = useState([])
    const [blockContent, setBlockContent] = useState([{
        number: blockNumber,
        blockHash: '',
        blockTransactions: [],
    }])

    const eth_getTransactionByBlockNumber = async (_blockNumber) => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const block = await provider.getBlock(_blockNumber)
        let txs = []

        block.transactions.forEach(async (tx) => {
            const txData = await provider.getTransaction(tx)
            txData.method = txData.data.slice(0, 10)
            txs.push(txData)
        })

        setTxsContent(txs)
    }

    //get last block number
    const getBlockNumber = async (_blockNumber, _blockContent) => {
        let blockTransactions = {}

        if ( _blockNumber !== _blockContent.number ) {
            console.log('getBlockNumber')
            console.log(_blockNumber , _blockContent.number)

            let provider = new ethers.providers.JsonRpcProvider(Config.node);

            //verify if metamask is connected
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
            }

            blockTransactions = await provider.getBlockWithTransactions(_blockNumber)

            blockTransactions.timediff = Math.round(+new Date()/1000) - blockTransactions.timestamp
            const date = new Date(blockTransactions.timestamp * 1000)
            blockTransactions.humandate = date.toString()
        } else {
            _blockContent.timediff = Math.round(+new Date()/1000) - _blockContent.timestamp

            const date = new Date(_blockContent.timestamp * 1000)
            _blockContent.humandate = date.toString()
            blockTransactions = _blockContent
        }

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if ( blockNumber !== blockContent.number ) {
                eth_getTransactionByBlockNumber(blockNumber)
                setLoading(true)
            }
            if (txsContent.length === 0) {
                eth_getTransactionByBlockNumber(blockNumber)
            }
            getBlockNumber(blockNumber, blockContent)
        }, 1000);

        return () => clearTimeout(timer)
    },[ blockNumber, blockContent, txsContent ])
    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title' >Block #{blockNumber}</h4>
            Loading... <br/><Spinner animation="border" variant="secondary" />
        </main>
    )
//    <Link to={`/block/${blockContent.number+1}`}><Button variant="primary" size="sm" className="ml-2">Next</Button></Link>
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Block #{blockContent.number}</h4>

                <Row>
                    <Col>
                        <BlockInfo block={blockContent} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TransactionList txs={txsContent} />
                    </Col>
                </Row>
        </main>
    );
}
export default Block