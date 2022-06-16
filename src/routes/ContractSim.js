import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Table, Button, Row, Col, Card, Spinner, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import ContractEvents from '../components/ContractEvents'
import MetamaskConnect from '../components/MetamaskConnect'

//http://127.0.0.1:3000/logs/0x4edDe623379B27db9B0283E917F4c130963cd676/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
//http://127.0.0.1:3000/logs/0x7d092def45Ba6960DF1A560E3990DAd430884C4d/0x966369fa3967a9adee1d13e1dfd82bfa577648627c3a450da8b4653b0425531e

const axios = require('axios').default;


const ContractSim = ({ web3Handler, account, networkName }) => {
    const params = useParams()
    const variant = {
        'nonpayable': 'warning',
        'payable': 'danger',
        'view': 'secondary',
    }

    const [abi, setAbi] = useState([])
    const [abiInterface, setAbiInterface] = useState([])
    const [events, setEvents] = useState([])

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)

    const [contract, setContract] = useState(null)

    const [outputs, setOutputs] = useState([])

    const getAbi = async (address) => {
        await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address='+address+'&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            //console.log(response.data.result)
            let newabi = []
            const abi = response.data.result

            if (abi.length > 0) {
                response.data.result.forEach(function (item) {
                    if (item.type === 'function') {
                        newabi.push(item)
                    }
                })

                setAbi(abi)
                setAbiInterface(newabi)
                setLoading(false)
            }   else {
                setLoading(false)
                getAbi('0x')
            }
        })
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

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async (address) => {
        const provider = new ethers.providers.JsonRpcProvider(Config.node);
        const contract = new ethers.Contract(address, abi, provider);
        const topics = contract.interface.events

        for (let key in topics) {
            //convert the key to bytelike
            const signature = keccak256(toUtf8Bytes(key));

            //get events
            await contract.queryFilter(signature, -1).then(function(filter) {

                //for event in the filter array
                for (let i = 0; i < filter.length; i++) {
                    const event = filter[i]
                    event.txkey = event.blockNumber +"-"+ event.transactionIndex +"-"+ event.logIndex +"-"+ event.transactionHash

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

    //function to call the function
    const callFunction = async (address,action) => {
        //console.log(action.name, contract[action.name])

        //call the function with a custom name
        await contract[action.name]().then(function(result) {

            if (result.toString().substring(0,2) === '0x') {
                result = result.toString()

            //if the result is a number
            } else if (result.toString().substring(0,1) === '-') {
                result = result.toString()

            } else {
                result = result.toString()
            }

            outputs[action.name] = result
            setOutputs(outputs)
        })

        //const args = action.inputs.map(input => {
        //    return input.type === 'address' ? input.value : toUtf8Bytes(input.value)
        //})
    }

    //a function that return an input that autoajust to the size of  the div
    function getInput(input) {
        return <div className="input-group">
            <input type="text" className="form-control" placeholder={input.name} value={input.value} onChange={(e) => input.setValue(e.target.value)} />
            <div className="input-group-append">
                <span className="input-group-text">{input.type}</span>
            </div>
        </div>
    }

    const loadContract = async (address) => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (accounts.length > 0) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        //console.log('Loading contract...')

        // Get provider from Metamask
        const wallet = provider.getSigner()
        const contract = new ethers.Contract(address, abi, wallet)

        setContract(contract)
    }

    // ---------------------------------------------------------------------------------------------------------- //
    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);

            //if abi is empty, get it
            if (abi.length === 0) {
                getAbi(params.contract)
            }

            loadContract(params.contract)
            getLatestEvent(params.contract)
            setLoading(false)

        }, 1000);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
                <h3>Contract Interface</h3>
                    Loading... <br/><Spinner animation="border" variant="primary" />
                </div>
        </div>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
                <h3>Contract Interface</h3>
                <Row>
                    <Col md={12} xs={12} lg={12} xl={12}>
                        <Card className="event-table">
                            <Card.Header>{getAddress(params.contract)}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                <ListGroup variant="flush" className="list-group-item">
                                {abiInterface.map((action, index) => {
                                    return <ListGroup.Item key={index}>
                                        <Row className="align-items-left">
                                            <Col md={3} className="text-left">
                                                <Button variant={variant[action.stateMutability]} className="copy-button" onClick={() => callFunction(params.contract,action)}>{action.name}</Button>
                                            </Col>
                                            <Col md={8} className="align-items-left">
                                                <Row className="align-items-left">
                                                <input variant={variant[action.stateMutability]} type="text" className="form-control" placeholder="" />
                                                </Row>
                                                <Row className="align-items-left">
                                                    {outputs[action.name]}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                                </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12} xs={12} lg={12} xl={12}>
                        <ContractEvents events={events}/>
                    </Col>
                </Row>

          </div>
        </div>
    );
}
export default ContractSim