import React from "react";
import { Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

//To: <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link><br/>

const LatestTransactions = ({txs}) => {
    return (
        <Col xs={1} md={4} lg={6} className="mb-3">
                <h5>Latest Transactions</h5>
                <ListGroup variant="flush">
                        {txs.map((item, idx) => (
                            <ListGroup.Item key={idx}>
                            Tx <Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 7) + '...'}</Link> {item.gas} xwei<br/>
                            From: <Link to={`/address/${item.from}`}>{item.from.slice(0, 9) + '...'+item.from.slice(33, 42)}</Link><br/>
                            {item.to ? <span>To: <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link><br/></span> : null}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
        </Col>
    );
};

export default LatestTransactions;