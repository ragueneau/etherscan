import React from "react";
import { Image, Col, Card } from 'react-bootstrap'

const Dashboard = ({txs}) => {
    return (
        <Col xs={12} md={12} lg={12}>
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