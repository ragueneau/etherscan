import React from "react";
import { ListGroup, Table, Image, Row, Col, Card } from 'react-bootstrap'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'

const Dashboard = ({stats,data}) => {
    return (
        <Col xs={12} md={12} lg={12}>
            <Card className="std-card-info">
                <Card.Body className="std-card-info-body">
                    <Table striped bordered hover>
                        <Row>
                            <Col xs={12} md={6} lg={6}>
                                <Row>
                                <Col xs={12} md={12} lg={6}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily Blocktime</b>: </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily Transactions Fee</b>: {Math.round((stats.dailytxnfee) * 1000000) / 1000000} xEth</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Transactions</b>: </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Net Utilization</b>: {Math.round((stats.dailynetutilization*100) * 1000) / 1000}% </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily New Adresses</b>: {stats.dailynewaddress} </span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                   <Col xs={12} md={12} lg={6}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily Difficulty</b>:  {Math.round((stats.avgdifficulty) * 1000000) / 1000000}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily Gas Limit</b>: {stats.dailyavggaslimit} gwei </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily GasPrice</b>: {stats.dailyavggasprice/1000000000} gwei </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily Gas Used</b>: {stats.dailygasused} gwei </span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={6} lg={6} xl={6}>
                                <LineChart width={300} height={200} data={data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="d1" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="d2" stroke="#82ca9d" />
                                    <Tooltip/>
                                    <Legend />
                                </LineChart>
                            </Col>
                        </Row>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Dashboard;