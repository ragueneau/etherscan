import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Table, Button, Row, Col, Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import TransactionList from '../components/TransactionList'

//http://127.0.0.1:3000/logs/0x4edDe623379B27db9B0283E917F4c130963cd676/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
//http://127.0.0.1:3000/logs/0x7d092def45Ba6960DF1A560E3990DAd430884C4d/0x966369fa3967a9adee1d13e1dfd82bfa577648627c3a450da8b4653b0425531e

const axios = require('axios').default;


const TokensLogs = ({ networkName }) => {
    const params = useParams()
    const [events, setEvents] = useState([])
    const [tokenList, setTokenlist] = useState([])
    const [abi, setAbi] = useState([])

    const [loading, setLoading] = useState(true)

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async () => {

        for (let i = 0; i < tokenList.length; i++) {
            const token = tokenList[i]

            let provider = new ethers.providers.JsonRpcProvider(Config.node);

            //verify if metamask is connected
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
            }

            const contract = new ethers.Contract(token.address, abi, provider);
            const topics = contract.interface.events

            for (let key in topics) {
                //convert the key to bytelike
                const signature = keccak256(toUtf8Bytes(key));

                //get events
                contract.queryFilter(signature, -1).then(function(filter) {

                    //for event in the filter array
                    for (let i = 0; i < filter.length; i++) {
                        const event = filter[i]
                        event.txkey = event.blockNumber +"-"+ (event.transactionIndex+1000) +"-"+ (event.logIndex+1000) +"-"+ event.transactionHash

                        event.name = token.name
                        event.symbol = token.symbol

                        // insert if transactionHash is not in the array
                        if ( !events.find(item => item.txkey === event.txkey) ) {
                            events.unshift(event)
                        }
                    }
                    //reverse sort by txkey
                    events.sort((a, b) => {
                        if (a.txkey < b.txkey) {
                            return 1;
                        }
                        if (a.txkey > b.txkey) {
                            return -1;
                        }
                        return 0;
                    })
                    setEvents(events)
                })
            }
        }
    }

    const getAbi = async () => {

        let _chainId = 35478
        if (window.ethereum) {
            _chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }

        //chainid hex to int
        const chainId = parseInt(_chainId, 16);

        await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address=0x&chainid='+chainId+'&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            //console.log(response.data.result)
            setAbi(response.data.result)
        })
    }

    const getTokenList = async () => {
        let _chainId = 35478
        if (window.ethereum) {
            _chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }

        //chainid hex to int
        const chainId = parseInt(_chainId, 16);

        const tokens = await axios.get(Config.restAPI + '/api?module=token&action=tokenlist&chainid='+chainId+'&apikey=' + Config.ApiKeyToken)
        const list = tokens.data.result
        setTokenlist(list)
    }


    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {

            //if tken list is empty, get it
            if (tokenList.length === 0) {
                getTokenList()
            }

            if (abi.length === 0) {
                getAbi()
            }

            getLatestEvent()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Tokens Transfers Logs</h4>
            Loading... <br/><Spinner animation="border" variant="secondary" />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4  className='Title'>ERC20 Tokens Transfers</h4>
            <Row>
                <Col>
                    <Card className="event-table">
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <Row>
                                        <Col>Block</Col>
                                        <Col>Event</Col>
                                        <Col>tx#</Col>
                                        <Col>Log#</Col>
                                        <Col>Symbol</Col>
                                        <Col>From</Col>
                                        <Col>To</Col>
                                        <Col>Value</Col>
                                    </Row>
                                </thead>
                                {events ? events.map((event, idx) => (
                                    <Row key={idx}>
                                        <Col><Link to={`/block/${event.blockNumber}`}>{event.blockNumber}</Link></Col>
                                        <Col>{event.event}</Col>
                                        <Col><Link to={`/tx/${event.transactionHash}`}>{event.transactionIndex}</Link></Col>
                                        <Col>{event.logIndex}</Col>
                                        <Col><Link to={`/address/${event.address}`}>{event.symbol}</Link></Col>
                                        <Col><Link to={`/address/${event.args[0]}`}>{event.args[0].slice(0, 5) + '...' + event.args[0].slice(38, 42)}</Link></Col>
                                        <Col><Link to={`/address/${event.args[1]}`}>{event.args[1].slice(0, 5) + '...' + event.args[1].slice(38, 42)}</Link></Col>
                                        <Col>{event.args[2] / 10 ** 18}</Col>
                                    </Row>
                                )): null}
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}
export default TokensLogs