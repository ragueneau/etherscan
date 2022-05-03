
import React from "react";
import { Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestBlocks = ({items}) => {
    return (
        <Col xs={1} md={4} lg={6}>
        <Card className="text-center">
            <Card.Body>
                <Card.Title><h5>Latest Blocks</h5></Card.Title>
                <Card.Text>
                    <ul>
                    {items.map((item, idx) => (
                        <li key={idx} className="list-group-item">
                        <Link to={`/block/${item.number}`}>{item.number}</Link> Hash: <Link to={`/block/${item.number}`}>{item.hash.slice(0, 15) + '...'}</Link><br/>
                        {item.transactions.length} transaction(s)
                        <br/>
                        {item.timediff} secs ago
                        </li>
                    ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    );
};
export default LatestBlocks;