
import React from "react";
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestBlocks = ({items}) => {
    return (
        <Card>
            <Card.Header>Latest Blocks</Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush">
                {items.map((item, idx) => (
                    <ListGroup.Item key={idx} className="list-group-item">
                        <Row className="list">
                            <Col className="col-list td-center" md={1}><h5>Bk</h5></Col>

                            <Col md={3} className="col-list">
                                <Row><Col><Link to={`/block/${item.number}`}>{item.number}</Link></Col></Row>
                                <Row><Col><small>{item.timediff} secs ago</small></Col></Row>
                            </Col>

                            <Col md={8} className="col-list">
                                <Row><Col><Link to={`/block/${item.number}`}>{item.hash.slice(0,32) + '...'}</Link></Col></Row>
                                <Row><Col><small>{item.transactions.length} transaction(s)</small></Col></Row>
                            </Col>

                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
        </Card>
    );
};
export default LatestBlocks;