import React from "react";
import { ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestTransactions = ({txs}) => {
    return (
        <ListGroup variant="flush">
            {txs.map((item, idx) => (
                <ListGroup.Item key={idx}>
                Tx <Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 7) + '...'}</Link> {item.gas} xwei<br/>
                From: <Link to={`/address/${item.from}`}>{item.from.slice(0, 9) + '...'+item.from.slice(33, 42)}</Link><br/>
                {item.to ? <span>To: <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link><br/></span> : null}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default LatestTransactions;