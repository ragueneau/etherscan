
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
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2 className="Address">Accounts</h2>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h2 className="Address">Top Accounts</h2>
                <Row className="justify-content-center">

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Top Balances</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Top Transactions</Card.Title>
                            </Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </div>
        </div>
    );
}
export default Accounts