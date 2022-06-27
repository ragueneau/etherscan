import React from "react";
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestTransactions = ({txs}) => {
    return (
        <Card>
            <Card.Header>Latest Transactions</Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                    {txs.map((item, idx) => (
                        <ListGroup.Item key={idx}>
                            <Row className="list">
                                <Col md={1} className="col-list">
                                    <Link to={`/tx/${item.hash}`}>{item.receipt.status ? <Button variant="success" size="sm" className="ml-2">Tx</Button> : <Button variant="danger" size="sm" className="ml-2">Tx</Button>}</Link>
                                </Col>
                                <Col md={2} className="col-list">
                                    <Row>
                                        <Link to={`/tx/${item.hash}`}  title={item.hash}>{item.hash.slice(0, 6) + '...'}</Link>
                                    </Row>
                                    <Row>
                                        <small>Bk:<Link to={`/block/${item.blockNumber}`}  title={item.blockNumber}>{item.blockNumber}</Link></small>
                                    </Row>
                                </Col>
                                <Col md={7} className="col-list">
                                    <Row>
                                        <Col>
                                            <small>From:</small> <Link to={`/address/${item.from}`} title={item.from}>{item.from.slice(0, 13) + '...'+item.from.slice(32, 42)}</Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {item.to ? <span><small>To:</small> <Link to={`/address/${item.to}`} title={item.to}>{item.to.slice(0, 13) + '...'+item.to.slice(32, 42)}</Link></span>
                                            : <span>Contract Creation</span>}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={2} className="col-list">
                                    <small>{item.receipt.gasUsed} gwei</small>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                        <ListGroup.Item>
                            <Link to="/txs">
                                <Button variant="secondary morebutton" size="sm" className="ml-2">More transactions</Button>
                            </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default LatestTransactions;