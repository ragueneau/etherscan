import Config from '../config.json'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";


const Contract = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h5>Loading contract {params.contractAddress}</h5>
        </main>
      )

      //setLoading(false)
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
                <h5>Contract {params.contractAddress}</h5>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Overview</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li className="list-group-item">Price: </li>
                                        <li className="list-group-item">Total Supply: </li>
                                        <li className="list-group-item">Holders: </li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Profile Summary</Card.Title>
                                <Card.Text>
                                <ul>
                                    <li className="list-group-item">Contract:
                                    <Link to={`/contract/${params.tokenAddress}`}>{params.tokenAddress}</Link></li>
                                    <li className="list-group-item">Decimals: </li>
                                    <li className="list-group-item">Official Site: </li>
                                    <li className="list-group-item">Social profiles: </li>
                                </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Transactions</Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Transactions</i>:
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </main>
    );
}
export default Contract