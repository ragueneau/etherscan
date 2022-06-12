import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Transaction = ({ transaction }) => {
    const receipt = {}
    for (let key in transaction.receipt) {
        receipt[key] = transaction.receipt[key]
    }
    console.log(transaction)
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
    <Card >
        <Card.Header>
            <Card.Title>Overview</Card.Title>
        </Card.Header>
        <Card.Body className="std-card-info">
            <ListGroup variant="flush">
                <ListGroup.Item><b>Transaction Hash</b>: {transaction.hash}</ListGroup.Item>
                <ListGroup.Item><b>Status</b>: {receipt.status ? <Button variant="success" size="sm" className="ml-2">Success</Button> : <Button variant="danger" size="sm" className="ml-2">Failed</Button>}</ListGroup.Item>
                <ListGroup.Item><b>Block Number</b>: <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link> <Button variant="secondary" size="sm" className="ml-2">{transaction.confirmations} Block confirmations</Button></ListGroup.Item>
                <ListGroup.Item><b>Timestamp</b>: {transaction.block.timediff} sec(s) ago {transaction.block.humandate} </ListGroup.Item>
                <ListGroup.Item><b>From</b>: <Link to={`/address/${transaction.from}`}>{transaction.from ? transaction.from : null}</Link></ListGroup.Item>
                <ListGroup.Item><b>To</b>: <Link to={`/address/${transaction.to}`}>{transaction.to ? transaction.to : null}</Link></ListGroup.Item>
                <ListGroup.Item><b>Value</b>: {transaction.value.toString() / 10 ** 18} Ethers</ListGroup.Item>
                <ListGroup.Item><b>Gas Price</b>: {transaction.gasPrice / 10 ** 9} gwei</ListGroup.Item>
                <ListGroup.Item><b>Gas Used</b>: {receipt.gasUsed / 10 ** 3} gwei</ListGroup.Item>
                <ListGroup.Item><b>Nonce</b>: {transaction.nonce}</ListGroup.Item>
                <ListGroup.Item><b>Transaction Index</b>: {transaction.transactionIndex}</ListGroup.Item>
                <ListGroup.Item><b>Transaction Type</b>: {transaction.type}</ListGroup.Item>
                <ListGroup.Item ><b>Input</b>: <pre>{transaction.input}</pre></ListGroup.Item>
                <ListGroup.Item ><b>R</b>: {transaction.r}</ListGroup.Item>
                <ListGroup.Item ><b>S</b>: {transaction.s}</ListGroup.Item>
                <ListGroup.Item ><b>V</b>: {transaction.v}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>

    );
}
export default Transaction