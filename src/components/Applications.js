
import React from "react";
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Applications = ({applications}) => {
    return (
        <Card>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                {applications.map((item, idx) => (
                    <ListGroup.Item key={idx} >
                        <Row className="list">
                            <Col md={4} className="col-list">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                            </Col>
                            <Col md={6} className="col-list">
                                <Link to={`/address/${item.contractAddress}`}>{item.contractAddress}</Link>
                            </Col>
                            <Col md={2} className="col-list">
                                <Link to={`/logs/${item.contractAddress}`}><Button variant="secondary btn-list" size="sm"> Events </Button>
                                </Link> <Link to={`/interface/${item.contractAddress}`}><Button variant="secondary btn-list" size="sm"> Interface </Button></Link>
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