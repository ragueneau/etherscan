
import React from "react";
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestBlocks = ({items}) => {
    return (
        <Card classMap="shadowCard">
            <Card.Header>Latest Blocks</Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                {items.map((item, idx) => (
                    <ListGroup.Item key={idx} >
                        <Row className="list">

                            <Col md={1} className="col-list">
                                <Link to={`/block/${item.number}`}><Button variant="secondary" size="sm" className="ml-2">Bk</Button></Link>
                            </Col>

                            <Col md={3} className="col-list">
                                <Row><Col><Link to={`/block/${item.number}`}>{item.number}</Link></Col></Row>
                                <Row><Col><small>{item.timediff} secs ago</small></Col></Row>
                            </Col>

                            <Col md={8} className="col-list">
                                <Row><Col>Miner: <Link to={`/address/${item.miner}`}>{item.miner}</Link></Col></Row>
                                <Row><Col><small>{item.transactions.length} transaction(s) in {item.duration} secs</small></Col></Row>
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