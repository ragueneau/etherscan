//import React, { Component } from "react";
import { Card,Col,Row,Table } from 'react-bootstrap'

const NavLastBlock = ({stats, network}) => {
    return (
        <Card className="nav-last-block">
            <Card.Body>
                <Row>
                    <Col title="Current network"><b>{network}</b></Col>
                    <Col>
                        <Row>
                            <Col title="Latest mined block">#<b>{stats.latest}</b></Col>
                        </Row>
                        <Row>
                            <Col title="Current pending block">#<b>{stats.pending}</b></Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NavLastBlock;