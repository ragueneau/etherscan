import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { Link  } from "react-router-dom";
import TokenList from '../components/TokenList'

import Config from '../config.json'
const axios = require('axios').default;

const Tokens = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    const getTokenList = async () => {
        //get token list from etherscan
        const response = await axios.get(Config.restAPI + '/api?module=token&action=tokenlist&apikey=' + Config.ApiKeyToken )
        const tokenList = response.data.result

        console.log(tokenList)
        setItems(tokenList)
        setLoading(false)
    }

    //a function to return a qr code for a given token address
    //const getQRCode = (tokenAddress) => {
    //    return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${tokenAddress}`
    //}

    useEffect(() => {
        getTokenList()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Tokens</h5>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Tokens </h5>
                <Row className="justify-content-center">
                    <Col md={6} lg={12}>
                        <TokenList tokens={items} />
                    </Col>
                </Row>

            </div>
        </div>
    );
}
export default Tokens