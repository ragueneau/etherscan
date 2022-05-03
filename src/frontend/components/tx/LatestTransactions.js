import React from "react";
import { Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

//To: <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link><br/>

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
                        Tx <Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 7) + '...'}</Link> {item.gas} xWEI<br/>
                        From: <Link to={`/address/${item.from}`}>{item.from.slice(0, 9) + '...'+item.from.slice(33, 42)}</Link><br/>
                        {item.to ? <span>To: <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link><br/></span> : null}
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