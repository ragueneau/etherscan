import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Nav, Button, Row, Col, Card, Spinner, ListGroup, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import ContractEvents from '../components/ContractEvents'
import MetamaskConnect from '../components/MetamaskConnect'

import { copyToClipboard, getAddress, linkAddress } from '../class/Tools'
import { getProvider, isContract, loadContract2 } from '../class/Evm'

const axios = require('axios').default;

const contracts = [
    {
        name: 'ERC20',
        address: '0x00000000000000000000000000000000000000001',
    },
    {
        name: 'ERC721',
        address: '0x00000000000000000000000000000000000000002',
    }
];

const Interface = ({ account, networkName, web3Handler }) => {
    const params = useParams()
    const variant = {
        'nonpayable': 'warning',
        'payable': 'danger',
        'view': 'secondary',
    }
    const [inputLabels, setInputLabels] = useState({})
    const [inputValues, setInputValues] = useState({})
    const [maximumGas, setMaximumGas] = useState(300000)
    const [etherValue, setEtherValue] = useState(0)

    const [abi, setAbi] = useState([])
    const [abiInterface, setAbiInterface] = useState([])
    const [events, setEvents] = useState([])
    const [eventLabels, setEventLabels] = useState([])

    const [loading, setLoading] = useState(true)

    const [contract, setContract] = useState(null)
    const [contractAddress, setContractAddress] = useState()

    const [outputs, setOutputs] = useState([])
    const [topicsStatus, setTopicsStatus] = useState(null)
    const [account1, setAccount] = useState(null)

    // ---------------------------------------------------------------------------------------------------- //
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

                let labels = {}
                newabi.forEach(function (item) {

                    if (item.name !== undefined  ) {
                        //if no inputs
                        labels[item.name] = ''

                       // if (item.inputs.length > 0) {
                        item.inputs.map(function (input) {
                            //next if undefined
                            if (input.name !== undefined || input.name !== 'undefined') {
                                labels[item.name] += input.name+' '+input.type

                                if (item.inputs.indexOf(input) < item.inputs.length - 1) {
                                    labels[item.name] += ', '
                                }
                            }
                        })
                //    }
                }
                })

                console.log(labels)
                setInputLabels(labels)

                setAbi(abi)
                setAbiInterface(newabi)
                setLoading(false)
            }   else {
                setLoading(false)
                //getAbi('0x')
            }
        })
    }

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async (address,abi) => {
        //const provider = new ethers.providers.JsonRpcProvider(Config.node);
        //let provider = new ethers.providers.WebSocketProvider(Config.node);

        //const contract1 = new ethers.Contract(address, abi, provider);
        const contract1 = await loadContract2(address,abi)
        const topics = contract1.interface.events

        //if no key in topics
        //if (Object.keys(topics).length === 0) {
        //    setTopicsStatus('No topics found for this contract')
        //}

        for (let key in topics) {
            //convert the key to bytelike
            const signature = keccak256(toUtf8Bytes(key));

            //get events
            await contract1.queryFilter(signature, -1000).then(function(filter) {

                //for event in the filter array
                for (let i = 0; i < filter.length; i++) {
                    const event = filter[i]
                    event.txkey = (100000000 + event.blockNumber) +"-"+ event.transactionIndex +"-"+ event.logIndex +"-"+ event.transactionHash

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

    // ---------------------------------------------------------------------------------------------------- //
    const callFunction = async (address, action) => {
        const contract1 = await loadContract2(address,abi)

        console.log('callFunction',address, action.name)

        const inputs = {}

        // if inputsValues is not empty
        for (let key in inputValues) {
            inputs[key] = inputValues[key]
        }

        if (inputs[action.name] === undefined ){
            inputs[action.name] = ''
        }

        //split the string into an array of strings if there is a comma
        if (inputs[action.name].includes(',')) {
            inputs[action.name] = inputs[action.name].split(',')
        }

        //if inputs[action.name] is  not an array
        if (Array.isArray(inputs[action.name]) === false) {
            inputs[action.name] = [inputs[action.name]]
        }

        //if inputs[action.name] is an empty array
        if (inputs[action.name][0] === '') {
            inputs[action.name] = ''
        }

        console.log('action.name:',action.name,' inputs:', inputs[action.name], ' maximumGas:', maximumGas, ' etherValue:', etherValue,abi)

        //call payable function 'enter'
        if (action.payable) {
            await contract1[action.name]({value: etherValue, gasLimit: maximumGas})
            .then(function(result) {

                outputs[action.name] = <Link target={'_blank'} to={`/tx/${result.hash}`}>{result.hash}</Link>

                setOutputs(outputs)
            })
        } else {
            await contract1[action.name](...inputs[action.name],{ gasLimit: maximumGas }).
            then(function(result) {

                if (result.toString().substring(0,2) === '0x') {

                    if (result.toString().includes(',')) {
                        result = result.toString().split(',')
                        result.forEach(function(item, index) {
                            result[index] = <span>{index}. {item}</span>
                        })
                    } else {
                        result = <span>{result}</span>
                    }

                //if the result is a number
                } else if (result.toString().substring(0,1) === '-') {
                    result = result.toString()


                } else if (result.toString().includes(',')) {
                    result = result.toString().split(',')
                    result.forEach(function(item, index) {
                        result[index] = <span>{index}. {item}</span>
                    })


                //if the result is an object
                } else if (result.hash) {
                    result = <Link to={`/tx/${result.hash}`}>{result.hash}</Link>
                } else {
                    //console.log('default result:', result)
                    result = <span>{result.toString()}</span>
                }

                outputs[action.name] = result
                setOutputs(outputs)
            })
        }

    }

    // ---------------------------------------------------------------------------------------------------- //
    const loadContract = async (address) => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);


        //verify if metamask is connected
        if (window.ethereum) {
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

            if (contractAddress === undefined) {
                setContractAddress(params.contract)
            }
            //if abi is empty, get it
            if (abi.length === 0 || contract.address !== contractAddress) {
                getAbi(contractAddress)
                loadContract(params.contract,abi)
            }

            getLatestEvent(params.contract,abi)
            setLoading(false)
    }, 1000);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Contract Interface</h4>
            Loading... <br/><Spinner animation="border" variant="secondary" />
        </main>
      )
    //<input variant={variant[action.stateMutability]} type="text" className="form-control" placeholder={inputLabels[action.name]}/>
    // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Contract Interface {getAddress(params.contract)}</h4>
            <Row>
                <Col xl={6} md={12} >
                    <Card className="event-table box">

                        <Card.Header>
                            <Row >
                                <Col md={2}>
                                {account ? (
                                    <Button variant="secondary btn-sm">
                                        {account.slice(0, 6) + '...' + account.slice(36, 42)}
                                    </Button>
                                ) : (
                                    <Button onClick={web3Handler} variant="secondary nav-button btn-sm">Connect Wallet</Button>
                                )}
                                </Col>
                            </Row>
                            <Row className="align-items-left">
                                <Col md={4} className="text-left">
                                    Value: <Form.Control onChange={(e) => setEtherValue(e.target.value)} value={etherValue} type="text" placeholder="wei" />
                                    <span className="text-muted">{(etherValue / 10 ** 18).toFixed(18)} eth</span>
                                </Col>
                                <Col md={3} className="text-left">
                                    Max Gas: <Form.Control onChange={(e) => setMaximumGas(e.target.value)} value={maximumGas} type="text" placeholder="Default Gas" />
                                </Col>
                                <Col md={5} className="text-left">
                                    {/* a set of default contract */}
                                    Contract: <Form.Control as="select" onChange={(e) => setContractAddress(e.target.value)} value={contract}>
                                        <option value={params.contract}>{params.contract}</option>
                                        {contracts.map((item, index) => {
                                            return <option key={index} value={item.address}>{item.name}</option>
                                        })}
                                    </Form.Control>

                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <Card.Text>
                            {account ? (
                                <ListGroup variant="flush" className="list-group-item">
                                {abiInterface.map((action, index) => {
                                    return <ListGroup.Item key={index}>
                                        <Row className="align-items-left">
                                            <Col md={3} className="text-left">
                                                <Button variant={variant[action.stateMutability]} className="copy-button" onClick={() => callFunction(params.contract,action)}>{action.name}</Button>
                                            </Col>
                                            <Col md={8} className="align-items-left">
                                                <Row className="align-items-left">
                                                    {! action.payable && action.inputs.length > 0 ?
                                                    <Col className="text-left">
                                                        <Form.Control onChange={(e) => setInputValues({...inputValues, [action.name]: e.target.value})} value={inputValues[action.name]} type="text" placeholder={inputLabels[action.name]} />
                                                    </Col> : null
                                                    }
                                                </Row>
                                                <Row className="align-items-left infobox">
                                                    {outputs[action.name]}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    })}
                                </ListGroup>
                            ) : (
                                <div>Connect metamask</div>
                            )}

                                </Card.Text>
                        </Card.Body>

                    </Card>
                </Col>
                <Col xl={6} md={12}  >
                    <ContractEvents events={events} labels={eventLabels}/>
                </Col>
            </Row>

        </main>
    );
}
export default Interface