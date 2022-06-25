import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Spinner, Button } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const axios = require('axios').default;

const Token = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [tokenAddress, setToken] = useState({})
    const [lastBlockNumber, setLastBlockNumber] = useState(0)

    //const [account, setAccount] = useState([])
    console.log('Network:', networkName)

    //get a qr code for the token
    const getQrCode = (address) => {
        return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${address}`
    }

    const addToken = async () => {

        const response = await axios.get(Config.restAPI + '/api?module=token&action=tokeninfo&contractaddress='+tokenAddress+'&apikey=' + Config.ApiKeyToken)
        const token = response.data.result

        const tokenSymbol = token.symbol;
        const tokenDecimals = token.decimals;
        const tokenImage = token.image;

        try {

            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });
            console.log('wasAdded:', wasAdded)
        } catch (error) {
            console.log('error:', error)
        }
    }


    //get the token supply
    const getTokenSupply = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }
        //const tokenAddress = {params.tokenAddress}
        //const token = new ethers.Contract(FaucetAddress.address, FaucetAbi.abi, signer)

    //    const token = new ethers.Contract(tokenAddress, tokenABI, provider)
    //   const supply = await token.totalSupply()
    //    console.log('Token supply:', supply)
        setLoading(false)
    }

    const getQRCode = (tokenAddress) => {
        return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${tokenAddress}`
    }

    //afunction that return qr code popup for a given token address
    const getQRCodePopup = (tokenAddress) => {
        return (
            <div>
                <div className="qr-code">
                    <img src={getQrCode(tokenAddress)} alt="qr code" />
                </div>
                <div className="qr-code-address">
                    <p>{tokenAddress}</p>
                </div>
            </div>
        )
    }




    useEffect(() => {
        getTokenSupply()
        setToken(params.tokenAddress)
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
        <main style={{ padding: "1rem 0" }}>
                <h5>Token {tokenAddress}</h5>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6}>
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
                    <Col xs={12} md={12} lg={6}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Profile Summary</Card.Title>
                                <Card.Text>
                                <ul>
                                    <li className="list-group-item"><b>Contract</b>: <Link to={`/address/${tokenAddress}`}>{tokenAddress.slice(0, 7) + '...' + tokenAddress.slice(35, 42)}</Link></li>
                                    <li className="list-group-item"><b>Decimals</b>: 0</li>
                                    <li className="list-group-item"><b>Official Site</b>: http://</li>
                                    <li className="list-group-item"><b>Social profiles</b>: </li>
                                    <Button variant="primary" onClick={() => addToken()}>Add Token</Button>
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
                {getQRCodePopup(tokenAddress)}
        </main>
    );
}
export default Token