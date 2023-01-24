import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import TokenList from '../components/TokenList'
//import { Link } from "react-router-dom";

import Config from '../config.json'
const axios = require('axios').default;

const Tokens = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    const getTokenList = async () => {
        let _chainId = 1

        if (window.ethereum) {
            _chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }

        //chainid hex to int
        const chainId = parseInt(_chainId, 16);

        //get token list from etherscan

        const response = await axios.get(Config.restAPI + '/api?module=token&action=tokenlist&apikey=' + Config.ApiKeyToken+ '&chainid=' + chainId)
        const tokenList = response.data.result

        setItems(tokenList)
        setLoading(false)
    }

    //a function to return a qr code for a given token address
    //const getQRCode = (tokenAddress) => {
    //    return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${tokenAddress}`
    //}

    const addToken = async (tokenAddress) => {

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

    useEffect(() => {
        getTokenList()
        console.log(items)
      }, [ networkName ])

      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>ERC20 Tokens</h4>
          Loading... <br/><Spinner animation="border" variant="secondary" />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>ERC20 Tokens</h4>
            <Row className="justify-content-center">
                <Col md={12} lg={12}>
                    <Card className="event-table">
                        <Card.Header>
                        </Card.Header>
                        <Card.Body>
                            <TokenList tokens={items} addToken={addToken}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}
export default Tokens