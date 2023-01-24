import { Card, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getAddress, linkAddress } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

const TransactionLogs = ({ transaction }) => {
    const receipt = {
        logs: []
    }
    for (let key in transaction.receipt) {
        receipt[key] = transaction.receipt[key]
    }
    //console.log(receipt.logs[0].topics)

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card classMap="shadowCard">
            <Card.Header>
                <Card.Title className="std-card-title">Transactions Logs</Card.Title>
            </Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush">
                    {receipt.logs.map((log, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <b>Log Index</b>: {log.logIndex}
                                <br />
                                <b>Transaction Index</b>: {log.transactionIndex}
                                <br />
                                <b>Transaction Hash</b>: <Link to={`/tx/${log.transactionHash}`}>{log.transactionHash}</Link>
                                <br />
                                <b>Block Number</b>: <Link to={`/block/${log.blockNumber}`}>{log.blockNumber}</Link>
                                <br />
                                <b>Block Hash</b>: <Link to={`/block/${log.blockNumber}`}>{log.blockHash}</Link>
                                <br />
                                <b>Address</b>: <Link to={`/address/${log.address}`}>{log.address}</Link>
                                <br />
                                <b>Data</b>: {log.data}
                                <br />
                                <b>Topics</b>: {log.topics.map((topic, index) => {
                                    return (
                                        <span key={index}><br/>{topic}</span>
                                    )
                                })}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
export default TransactionLogs