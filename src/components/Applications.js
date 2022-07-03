
import React from "react";
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Applications = ({applications}) => {
    return (
        <div className="flex justify-center">
        {applications.length > 0 ? (
            <Card>
                <Card.Header>
                </Card.Header>
                <Card.Body className="std-card-info">
                    <ListGroup variant="flush" className="list-group-item">
                    {applications.map((item, idx) => (
                        <ListGroup.Item key={idx} >
                            <Row className="list" style={{textAlign: "left"}}>
                                <Col md={2} className="col-list" style={{textAlign: "left"}}>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                                </Col>
                                <Col md={4} className="col-list" style={{textAlign: "left"}}>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                                </Col>
                                <Col md={4} className="col-list" style={{textAlign: "left"}}>
                                    <Link to={`/address/${item.contractAddress}`}>{item.contractAddress}</Link>
                                </Col>
                                <Col md={2} className="col-list" style={{textAlign: "center"}}>
                                    <Link to={`/logs/${item.contractAddress}`}><Button variant="secondary btn-list" size="sm"> Events </Button>
                                    </Link> <Link to={`/interface/${item.contractAddress}`}><Button variant="secondary btn-list" size="sm"> Interface </Button></Link>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
            </Card>
        ) : (
            <div>
                <p className="mx-3 my-0">No applications are available for this chain.</p>
            </div>
        )}
        </div>
    );
};
export default Applications;