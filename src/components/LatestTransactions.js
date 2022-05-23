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

                    <Col md={3}>
                        <Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 7) + '...'}</Link>
                    </Col>

                    <Col md={6}>
                        <Row>
                            <Col>
                            <small>From:</small> <Link to={`/address/${item.from}`}>{item.from.slice(0, 7) + '...'+item.from.slice(35, 42)}</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {item.to ? <span><small>To:</small> <Link to={`/address/${item.to}`}>{item.to.slice(0, 7) + '...'+item.to.slice(35, 42)}</Link></span> : null}
                            </Col>
                        </Row>
                    </Col>

                    <Col md={2}>
                        <small>{item.gas} wei</small>
                    </Col>

                </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default LatestTransactions;