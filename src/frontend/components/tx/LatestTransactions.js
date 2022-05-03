
import React from "react";
import { Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestTransactions = ({items}) => {
    return (
        <Col xs={1} md={4} lg={6}>
        <Card className="text-center">
            <Card.Body>
                <Card.Title>
                    <h5>Latest Transactions</h5>
                </Card.Title>
                <Card.Text>
                    <span className="text-muted">
                        <i className="fas fa-user-circle">Text</i>
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
    );
};

export default LatestTransactions;