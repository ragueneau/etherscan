import React from "react";
import { Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestTransactions = ({txs}) => {
    return (
        <Col xs={1} md={4} lg={6}>
        <Card className="text-center">
            <Card.Body>
                <Card.Title>
                    <h5>Latest Transactions</h5>
                </Card.Title>
                <Card.Text>
                <ul>
                    {txs.map((item, idx) => (
                        <li key={idx} className="list-group-item">
                        <Link to={`/block/${item.blockNumber}`}>{item.blockNumber}</Link> Hash: <Link to={`/block/${item.blockNumber}`}>{item.hash.slice(0, 15) + '...'}</Link><br/>
                        <br/>

                        </li>
                    ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    );
};

export default LatestTransactions;