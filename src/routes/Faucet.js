import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const Home = ({ faucet, account, networkName }) => {
    const [loading, setLoading] = useState(false)

    const faucetOwner = account
    //const faucetOwner = faucet.owner()
    //const faucetBalance = faucet.balanceOf(faucet.address)

    //const [account, setAccount] = useState([])
    console.log('Network:', networkName)
    console.log('Faucet:', faucet)
    console.log('Account:', account)

    const donateTokens = async (account) => {
        await (await faucet.requestTokens(account)).wait()
        //loadMarketplaceItems()
    }

    const requestTokens = async (account) => {
        await (await faucet.requestTokens(account)).wait()
        //loadMarketplaceItems()
    }

    useEffect(() => {
        //loadMarketplaceItems()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading home...</h2>
        </main>
      )
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h2>xETH Faucet</h2>
                <Row className="justify-content-center">
                    <Col xs={12} md={12}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <h3>Title</h3>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Text</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={12}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <Button onClick={donateTokens} variant="primary">
                                        <span className="text-white">
                                            <i className="fas fa-user-circle">Donate Tokens</i>
                                        </span>
                                    </Button>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Donate 5 xETH</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <Button onClick={requestTokens} variant="primary">
                                        <span className="text-white">
                                            <i className="fas fa-user-circle">Request xETH</i>
                                        </span>
                                    </Button>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Send 5 xETH to {account}</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <Button onClick={requestTokens} variant="primary">
                                        <span className="text-white">
                                            <i className="fas fa-user-circle">Request ERC-20 TKN</i>
                                        </span>
                                    </Button>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Send 5 TKN to {account}</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <h4>Faucet Stats</h4>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">{faucetOwner}</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <h4>Wallet Stats</h4>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">{faucetOwner}</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Home