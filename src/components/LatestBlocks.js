
import React from "react";
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestBlocks = ({items}) => {
    return (
        <ListGroup variant="flush">
            {items.map((item, idx) => (
                <ListGroup.Item key={idx} className="list-group-item">
                    <Row>
                        <Col md={1}><h5>Bk</h5></Col>

                        <Col md={4}>
                            <Row><Col><Link to={`/block/${item.number}`}>{item.number}</Link></Col></Row>
                            <Row><Col><small>{item.timediff} secs ago</small></Col></Row>
                        </Col>

                        <Col md={7}>
                            <Row><Col><Link to={`/block/${item.number}`}>{item.hash.slice(0,22) + '...'}</Link></Col></Row>
                            <Row><Col><small>{item.transactions.length} transaction(s)</small></Col></Row>
                        </Col>

                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default LatestBlocks;