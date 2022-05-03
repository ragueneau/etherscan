import React from "react";
import { Image, Row, Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Dashboard = ({txs}) => {
    return (
        <Col xs={1} md={4} lg={12}>
        <Card className="text-center">
            <Card.Body>
                <Card.Title>
                    <h5>Dashboard</h5>
                </Card.Title>
                <Card.Text>
                    <Image src="https://via.placeholder.com/150" roundedCircle />
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>

    );
};

export default Dashboard;