import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";


const Block = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const blockNumber = parseInt(params.blockNumber)
    const [blockContent, setBlockContent] = useState([{
        blockNumber: blockNumber,
        blockHash: '',
        blockTransactions: [],
    }])

    //get last block number
    const getBlockNumber = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const blockTransactions = await provider.getBlockWithTransactions(blockNumber)

        blockTransactions.timediff = Math.round(+new Date()/1000) - blockTransactions.timestamp

        const date = new Date(blockTransactions.timestamp * 1000)
        blockTransactions.humandate = date.toString()

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getBlockNumber()
        }, 1000);

        return () => clearTimeout(timer)
    })
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading block {blockNumber}...</h2>
        <Spinner animation="border" style={{ display: 'flex' }} />
      </main>
    )
//    <Link to={`/block/${blockContent.number+1}`}><Button variant="primary" size="sm" className="ml-2">Next</Button></Link>
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container text-center">
                <h5>Block {blockContent.hash}</h5>
                <Row className="justify-content-center">
                    <Col xs={1} md={8} lg={12}>
                     <h5>Overview</h5>
                        <ul>
                            <li className="list-group-item">
                                <b>Block height</b>: <i className="fas fa-user-circle">{blockContent.number}
                                </i> <Link to={`/block/${blockContent.number-1}`} className="btn btn-primary">Previous</Link> <Link to={`/block/${blockContent.number+1}`} className="btn btn-primary">Next</Link>
                            </li>
                            <li className="list-group-item">
                                <b>Timestamp</b>: <i className="fas fa-user-circle">{blockContent.timediff} sec(s) ago {blockContent.humandate}</i>
                            </li>
                            <li className="list-group-item">
                                <b>Transactions</b>: <Link to={`/txs/${blockContent.number}`}><Button variant="secondary" size="sm" className="ml-2">{blockContent.transactions.length} transactions</Button></Link>
                            </li>
                            <li className="list-group-item">
                                <b>Burned Fees</b>: <i className="fas fa-user-circle">0 wei</i>
                            </li>
                            <li className="list-group-item">
                                <b>Difficulty</b>: <i className="fas fa-user-circle">{blockContent.difficulty}</i>
                            </li>
                            <li className="list-group-item">
                                <b>Total Difficulty</b>: <i className="fas fa-user-circle">{blockContent.totalDifficulty}</i>
                            </li>
                            <li className="list-group-item">
                                <b>Gas Used</b>: <i className="fas fa-user-circle">{blockContent.gasUsed.toString()} wei</i>
                            </li>
                            <li className="list-group-item">
                                <b>Gas Limit</b>: <i className="fas fa-user-circle">{blockContent.gasLimit.toString()} wei</i>
                            </li>
                            <li className="list-group-item">
                                <b>Nonce</b>: <i className="fas fa-user-circle">{blockContent.nonce}</i>
                            </li>
                            <li className="list-group-item">
                                <b>Miner</b>: <Link to={`/address/${blockContent.miner}`}><i className="fas fa-user-circle">{blockContent.miner}</i></Link>
                            </li>
                            <li className="list-group-item">
                                <b>Block hash</b>: <Link to={`/block/${blockContent.number}`}><i className="fas fa-user-circle">{blockContent.hash}</i></Link>
                            </li>
                            <li className="list-group-item">
                                <b>Parent Hash</b>: <Link to={`/block/${blockContent.number - 1}`}><i className="fas fa-user-circle">{blockContent.parentHash}</i></Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Block