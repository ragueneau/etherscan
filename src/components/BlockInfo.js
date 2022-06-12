import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

const BlockInfo = ({ block }) => {
    console.log(block)
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card>
            <Card.Header>
                <Card.Title>Overview</Card.Title>
            </Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush">
                    <ListGroup.Item><b>Block Number</b>: <i>{block.number}</i> <Link to={`/block/${block.number-1}`} className="btn btn-primary btn-card">Previous</Link> <Link to={`/block/${block.number+1}`} className="btn btn-primary btn-card">Next</Link></ListGroup.Item>
                    <ListGroup.Item><b>Timestamp</b>: {block.timediff} sec(s) ago {block.humandate} </ListGroup.Item>
                    <ListGroup.Item><b>Transactions</b>: <Link to={`/txs/${block.number}`}><Button variant="secondary" size="sm" className="ml-2 btn-card">{block.transactions.length} transactions</Button></Link></ListGroup.Item>
                    <ListGroup.Item><b>Gas Used</b>: {block.gasUsed.toString()} wei</ListGroup.Item>
                    <ListGroup.Item><b>Gas Limit</b>: {block.gasLimit.toString()} wei</ListGroup.Item>
                    <ListGroup.Item><b>Difficulty</b>: {block.difficulty}</ListGroup.Item>
                    <ListGroup.Item><b>Total Difficulty</b>: {block.totalDifficulty}</ListGroup.Item>
                    <ListGroup.Item><b>Nonce</b>: {block.nonce}</ListGroup.Item>
                    <ListGroup.Item><b>Miner</b>: <Link to={`/address/${block.miner}`}><i className="fas fa-user-circle">{block.miner}</i></Link></ListGroup.Item>
                    <ListGroup.Item><b>Block hash</b>: <Link to={`/block/${block.number}`}><i className="fas fa-user-circle">{block.hash}</i></Link></ListGroup.Item>
                    <ListGroup.Item><b>Parent Hash</b>: <Link to={`/block/${block.number - 1}`}><i className="fas fa-user-circle">{block.parentHash}</i></Link></ListGroup.Item>
                    <ListGroup.Item><b>Extra Data</b>: {block.extraData}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
      );
}
export default BlockInfo