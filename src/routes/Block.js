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

    //get last block number
    const getBlockNumber = async () => {
        let blockTransactions = {}

        if ( blockNumber !== blockContent.number ) {
            console.log('getBlockNumber')
            console.log(blockNumber , blockContent.number)

            let provider = new ethers.providers.JsonRpcProvider(Config.node);

            //verify if metamask is connected
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
            }

            blockTransactions = await provider.getBlockWithTransactions(blockNumber)

            blockTransactions.timediff = Math.round(+new Date()/1000) - blockTransactions.timestamp
            const date = new Date(blockTransactions.timestamp * 1000)
            blockTransactions.humandate = date.toString()
        } else {
            blockContent.timediff = Math.round(+new Date()/1000) - blockContent.timestamp

            const date = new Date(blockContent.timestamp * 1000)
            blockContent.humandate = date.toString()
            blockTransactions = blockContent
        }

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if ( blockNumber !== blockContent.number ) {
                eth_getTransactionByBlockNumber()
                setLoading(true)
            }
            if (txsContent.length === 0) {
                eth_getTransactionByBlockNumber()
            }
            getBlockNumber()
        }, 1000);

        return () => clearTimeout(timer)
    })
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