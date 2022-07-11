
import Config from '../config.json'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import TokenList from '../components/TokenList'
import { Link } from "react-router-dom";

const axios = require('axios').default;

const Accounts = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])


    useEffect(() => {

        setLoading(false)
      }, [])

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className="Title">Accounts</h4>
                <Row>

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className="std-card-title">Top Balances</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className="std-card-title">Top Transactions</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <br/>
                <Row>

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className="std-card-title">Top Miners</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title className="std-card-title">Top Gas Used</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </main>
    );
}
export default Accounts