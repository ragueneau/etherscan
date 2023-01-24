import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Transaction = ({ transaction }) => {

    const receipt = {}
    for (let key in transaction.receipt) {
        receipt[key] = transaction.receipt[key]
    }
    const txStatusText = receipt.status ? 'success' : 'danger'
    const txStatusName = receipt.status ? 'Success' : 'Failed'

    let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

    function copyToClipboard(text) {

        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
    <Card classMap="shadowCard">
        <Card.Header>
            <Card.Title className="std-card-title">Overview</Card.Title>
        </Card.Header>
        <Card.Body className="std-card-info">
            <ListGroup variant="flush">
                <ListGroup.Item><b>Transaction Hash</b>: {transaction.hash}</ListGroup.Item>
                <ListGroup.Item><b>Status</b>: <Button variant={`${txStatusText}`} size="sm" className="ml-2">{`${txStatusName}`}</Button></ListGroup.Item>
                <ListGroup.Item><b>Block Number</b>: <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link> <Button variant="secondary" size="sm" className="ml-2">{transaction.confirmations} Block confirmations</Button></ListGroup.Item>
                <ListGroup.Item><b>Timestamp</b>: {transaction.block.timediff} sec(s) ago {transaction.block.humandate} </ListGroup.Item>
                <ListGroup.Item><b>From</b>: <Link to={`/address/${transaction.from}`}>{transaction.from ? transaction.from : null}</Link> <span onClick={() => copyToClipboard(transaction.from)}>{copyIcon}</span></ListGroup.Item>
                <ListGroup.Item><b>To</b>: <Link to={`/address/${transaction.to}`}>{transaction.to ? transaction.to : null}</Link> <span onClick={() => copyToClipboard(transaction.to)}>{copyIcon}</span></ListGroup.Item>
                <ListGroup.Item><b>Value</b>: {transaction.value.toString() / 10 ** 18} Ethers</ListGroup.Item>
                <ListGroup.Item><b>Gas Price</b>: {transaction.gasPrice / 10 ** 9} gwei</ListGroup.Item>
                <ListGroup.Item><b>Gas Used</b>: {receipt.gasUsed / 10 ** 0} gwei</ListGroup.Item>
                <ListGroup.Item><b>Gas Limit</b>: {transaction.gas / 10 ** 0} gwei</ListGroup.Item>
                <ListGroup.Item><b>Nonce</b>: {transaction.nonce}</ListGroup.Item>
                <ListGroup.Item><b>Transaction Index</b>: {transaction.transactionIndex}</ListGroup.Item>
                <ListGroup.Item><b>Transaction Type</b>: {receipt.type}</ListGroup.Item>
                <ListGroup.Item ><b>Input</b>: {transaction.input}</ListGroup.Item>
                <ListGroup.Item ><b>V</b>: {transaction.v}</ListGroup.Item>
                <ListGroup.Item ><b>R</b>: {transaction.r}</ListGroup.Item>
                <ListGroup.Item ><b>S</b>: {transaction.s}</ListGroup.Item>
                <ListGroup.Item ><b>logs Bloom</b>: {receipt.logsBloom}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
    );
}
export default Transaction