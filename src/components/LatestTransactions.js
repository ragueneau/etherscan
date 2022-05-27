import React from "react";
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestTransactions = ({txs}) => {
    return (
        <ListGroup variant="flush">
            {txs.map((item, idx) => (
                <ListGroup.Item key={idx}>
                <Row>

                    <Col md={1}>
                        <h5>Tx</h5>
                    </Col>

                    <Col md={2}>
                        <Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 6) + '...'}</Link>
                    </Col>

                    <Col md={6}>
                        <Row>
                            <Col>
                                <small>From:</small> <Link to={`/address/${item.from}`}>{item.from.slice(0, 7) + '...'+item.from.slice(37, 42)}</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {item.to ? <span><small>To:</small> <Link to={`/address/${item.to}`}>{item.to.slice(0, 7) + '...'+item.to.slice(37, 42)}</Link></span> : null}
                            </Col>
                        </Row>
                    </Col>

                    <Col md={3}>
                        <small>{(item.gas / 1000).toFixed(0)} Kwei</small>
                    </Col>

                </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default LatestTransactions;