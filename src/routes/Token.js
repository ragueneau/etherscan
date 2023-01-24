import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Modal, ListGroup, Image, Row, Col, Card, Spinner, Button, Nav } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

import ContractEvents from '../components/ContractEvents'
import { getAddress, linkAddress } from '../class/Tools'

const axios = require('axios').default;

const Token = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [tokenAddress, setToken] = useState({})
    const [lastBlockNumber, setLastBlockNumber] = useState(0)
    const [token, setTokenData] = useState({})

    const [events, setEvents] = useState([])
    const [eventLabels, setEventLabels] = useState([])
    const [tab, setTab] = useState(1)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const [account, setAccount] = useState([])
    console.log('Network:', networkName)

    //get a qr code for the token
    const getQrCode = (address) => {
        return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${address}`
    }

    const addToken = async () => {

        const response = await axios.get(Config.restAPI + '/api?module=token&action=tokeninfo&contractaddress='+tokenAddress+'&apikey=' + Config.ApiKeyToken)
        const _token = response.data.result

        const tokenSymbol = _token.symbol;
        const tokenDecimals = _token.decimals;
        const tokenImage = _token.image;

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
    const getTokenSupply = async (_token) => {

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

    }

    const getQRCode = (tokenAddress) => {
        return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${tokenAddress}`
    }

    //afunction that return qr code popup for a given token address
    const getQRCodePopup = (tokenAddress) => {
        return (
            <div>
                <img src={getQrCode(tokenAddress)} alt={tokenAddress} title={tokenAddress} />
            </div>
        )
    }

    const getTokenInfo = async (tokenAddress) => {
        const response = await axios.get(Config.restAPI + '/api?module=token&action=tokeninfo&contractaddress='+tokenAddress+'&apikey=' + Config.ApiKeyToken)
        const token = response.data.result
        if (token) {
            setTokenData(token)
        } else {
            setTokenData({
                image:'https://etherscan.coeptix.net/token.png',
                name:'Unknown',
                symbol:'Unknown',
                decimals:0,
                totalSupply:0,
                owner:'Unknown',
                lastUpdated:0,
                site_url: '',
            })
        }
        setLoading(false)
    }



    useEffect(() => {
        getTokenSupply(params.tokenAddress)
        setToken(params.tokenAddress)
        getTokenInfo(params.tokenAddress)
        console.log('Token:', JSON.stringify(token))
      }, [
        networkName,
        params.tokenAddress,
        token
      ])

      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Loading token {params.tokenAddress}</h4>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      //setLoading(false)
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
                <h4 className='Title'>
                {token.image !== '' ?
                (
                    <Image src={token.image} style={{width: '32px'}} />
                ) : ( <Image src='https://etherscan.coeptix.net/token.png' style={{width: '32px'}} /> ) } {token.name}
                </h4>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6}>
                        <Card className='infobox box'>
                            <Card.Header>
                                <Card.Title><b>Overview</b></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Value</b>: {token.balance / token.totalSupply} xETH</ListGroup.Item>
                                    <ListGroup.Item><b>Total Supply</b>: {token.totalSupply / 10 ** token.decimals} {token.symbol}</ListGroup.Item>
                                    <ListGroup.Item><b>Holders</b>: </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                        <Card className='infobox box'>
                            <Card.Header>
                                <Row>
                                    <Col><Card.Title><b>Profile Summary</b></Card.Title></Col>
                                    <Col><Button variant="secondary" size="sm" onClick={() => addToken()} style={{float: 'right', margin: '1px'}}>Add Token</Button><Button variant="dark" size="sm" onClick={handleShow} style={{margin: '1px',float: 'right'}}>QR</Button> </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Contract</b>: <Link to={`/address/${tokenAddress}`}>{tokenAddress.slice(0, 7) + '...' + tokenAddress.slice(35, 42)}</Link></ListGroup.Item>
                                    <ListGroup.Item><b>Decimals</b>: {token.decimals}</ListGroup.Item>
                                    <ListGroup.Item><b>Official Site</b>: <a href={token.site_url} rel="noopener noreferrer">{token.site_url}</a></ListGroup.Item>
                                    <ListGroup.Item><b>Social profiles</b>: </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Card className='infobox box'>
                            <Card.Header>
                                <Card.Title>Transactions</Card.Title>
                                <Nav variant="tabs" defaultActiveKey="1">
                                    <Nav.Item>
                                        <Nav.Link eventKey="1" onClick={() => setTab(1)}>All</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="2" onClick={() => setTab(2)}>Sent</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="3" onClick={() => setTab(3)}>Received</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                {/* <ContractEvents events={events} labels={eventLabels}/> */}
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                <Modal className="r-code" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{token.image !== '' ?
                        (
                            <Image src={token.image} style={{width: '32px'}} />
                        ) : ( <Image src='https://etherscan.coeptix.net/token.png' style={{width: '32px'}} /> ) } {token.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{getQRCodePopup(tokenAddress)}</Modal.Body>
                </Modal>
        </main>
    );
}
export default Token
