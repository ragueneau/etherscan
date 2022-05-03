import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const Token = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [lastBlockNumber, setLastBlockNumber] = useState(0)

    //const [account, setAccount] = useState([])
    console.log('Network:', networkName)


    //get the token supply
    const getTokenSupply = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //const tokenAddress = {params.tokenAddress}
        //const token = new ethers.Contract(FaucetAddress.address, FaucetAbi.abi, signer)

    //    const token = new ethers.Contract(tokenAddress, tokenABI, provider)
    //   const supply = await token.totalSupply()
    //    console.log('Token supply:', supply)
        setLoading(false)
    }


    useEffect(() => {
        getTokenSupply()

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Loading token {params.tokenAddress}</h5>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      //setLoading(false)
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Token {params.tokenAddress}</h5>

                <Row className="justify-content-center">
                    <Col xs={1} md={6} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Overview</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li className="list-group-item"><b>Price</b>: </li>
                                        <li className="list-group-item"><b>Total Supply</b>: </li>
                                        <li className="list-group-item"><b>Holders</b>: </li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={1} md={6} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Profile Summary</Card.Title>
                                <Card.Text>
                                <ul>
                                    <li className="list-group-item"><b>Contract</b>: <Link to={`/address/${params.tokenAddress}`}>{params.tokenAddress.slice(0, 7) + '...' + params.tokenAddress.slice(35, 42)}</Link></li>
                                    <li className="list-group-item"><b>Decimals</b>: 0</li>
                                    <li className="list-group-item"><b>Official Site</b>: http://</li>
                                    <li className="list-group-item"><b>Social profiles</b>: </li>
                                </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={1} md={10} lg={12}>
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

            </div>
        </div>
    );
}
export default Token