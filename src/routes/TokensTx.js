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

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async () => {

        for (let i = 0; i < tokenList.length; i++) {
            const token = tokenList[i]

                // handle success
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                let provider = new ethers.providers.JsonRpcProvider(Config.node);

                //verify if metamask is connected
                if (accounts.length > 0) {
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
        await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address=0x&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            //console.log(response.data.result)
            setAbi(response.data.result)
        })
    }

    const getTokenList = async () => {
        const tokens = await axios.get(Config.restAPI + '/api?module=token&action=tokenlist&apikey=' + Config.ApiKeyToken)
        const list = tokens.data.result
        setTokenlist(list)
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    //function to display a trunked address and a button to copy it
    function getAddress(address) {
        const addr = address.slice(0,6) + '...' + address.slice(-4)

        return <div>
            <span className="text-truncate">{address}</span>
            <Button variant="link" className="copy-button" onClick={() => copyToClipboard(address)}>copy</Button>
        </div>
    }
    function linkAddress(address) {
        const addr = address.slice(0,6) + '...' + address.slice(-4)

        return <div>
            <Link to={`/address/${address}`}>{addr}</Link>
        </div>
    }
    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);

            //if tken list is empty, get it
            if (tokenList.length === 0) {
                //console.log('get token list')
                getTokenList()
            }

            if (abi.length === 0) {
                //console.log('get abi')
                getAbi()
            }

            getLatestEvent()
            setLoading(false)
        }, 5000);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
                <h5>Tokens Transfers Logs</h5>
                    Loading... <br/><Spinner animation="border" variant="primary" />
                </div>
          </div>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
              <h5>Tokens Event Logs</h5>
              <Card className="event-table">
                <Card.Header>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Block Number</th>
                                <th>Event</th>
                                <th>tx#</th>
                                <th>Log#</th>
                                <th>Symbol</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            {events ? events.map((event, idx) => (
                                <tr key={idx}>
                                    <td><Link to={`/block/${event.blockNumber}`}>{event.blockNumber}</Link></td>
                                    <td>{event.event}</td>
                                    <td><Link to={`/tx/${event.transactionHash}`}>{event.transactionIndex}</Link></td>
                                    <td>{event.logIndex}</td>
                                    <td><Link to={`/address/${event.address}`}>{event.symbol}</Link></td>
                                    <td><Link to={`/address/${event.args[0]}`}>{event.args[0].slice(0, 5) + '...' + event.args[0].slice(38, 42)}</Link></td>
                                    <td><Link to={`/address/${event.args[0]}`}>{event.args[1].slice(0, 5) + '...' + event.args[1].slice(38, 42)}</Link></td>
                                    <td>{event.args[2] / 10 ** 18}</td>
                                </tr>
                            )): null}
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default TokensLogs