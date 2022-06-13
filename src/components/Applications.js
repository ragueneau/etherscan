
import React from "react";
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Applications = ({applications}) => {
    return (
        <Card>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                {applications.map((item, idx) => (
                    <ListGroup.Item key={idx} >
                        <Row className="list">
                            <Col md={3} className="col-list">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                            </Col>
                            <Col md={5} className="col-list">
                                <Link to={`/address/${item.contractAddress}`}>{item.contractAddress}</Link>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
        </Card>
    );
};
export default Applications;