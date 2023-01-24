import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
//import { solc } from 'solc'

import { Badge, Button, Table, Row, Col, Card, Spinner, ListGroup, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

//import { keccak256 } from "@ethersproject/keccak256";
//mport { toUtf8Bytes } from "@ethersproject/strings";

//import ContractEvents from '../components/ContractEvents'
//import MetamaskConnect from '../components/MetamaskConnect'

//import Compile from '../components/Compile'

import { copyToClipboard, getAddress, linkCopyAddress } from '../class/Tools'
import { afterMain } from '@popperjs/core'
//import { getProvider, isContract, loadContract2 } from '../class/Evm'

const axios = require('axios').default;

const Interfaces = ({ web3Handler, account, networkName }) => {
    const params = useParams()

    const [abi, setAbi] = useState([])
    const [abis, setAbis] = useState([])
    const [contracts, setContracts] = useState([])
    const [contractFile, setContractFile] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [searchFilter, setSearchFilter] = useState('all')
    const [searchAccount, setSearchAccount] = useState('')

    const [loading, setLoading] = useState(true)

    // ---------------------------------------------------------------------------------------------------- //
    // function to get the list of abi
    const getAbis = async (address) => {
        await axios.get(Config.restAPI + '/api?module=contract&action=getabis&chainid=35478&apikey=' + Config.ApiKeyToken)
            .then(function (response) {
                let newAbis = []
                for (let i = 0; i < response.data.result.length; i++) {

                    newAbis.push({
                        address: response.data.result[i].address,
                        name: response.data.result[i].name
                    })
                   // console.log(newAbis)
                }
                setAbis(newAbis)
            })
    }

    //function to get the list of contracts
    const getContracts = async () => {
        await axios.get(Config.restAPI + '/api?module=contract&action=contractlist&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            //console.log(response.data.result)
            let newContracts = []
            const contracts = response.data.result

            if (contracts.length > 0) {
                response.data.result.forEach(function (item) {
                    let from = item.from ? item.from : '-'
                    if (item.address !== undefined) {
                        newContracts.push({
                            address: item.address.toLowerCase(),
                            addr: item.address,
                            name: item.contractName,
                            from: from,
                            isERC20: item.isERC20,
                            isERC721: item.isERC721,
                            balance: item.balance
                        })
                    }
                })

                setContracts(newContracts)
                setLoading(false)
            }   else {
                setLoading(false)
            }
        })
    }

    const Compile = async () => {
        //print to the console the code to compile
                console.log(contractFile)

    }

    const listHeader = () => {
        return (
            <Card className="box">
                <Card.Body>
                    <Row className="justify-content-center">

                        <Col xs={5} md={5}>
                            <Form.Group controlId="formContractSearch">
                                <Form.Label>Search</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} />
                            </Form.Group>
                        </Col>

                        <Col xs={2} md={2}>
                            <Form.Group controlId="formContractFilter">
                                <Form.Label>Filter</Form.Label>
                                <Form.Control size="sm" as="select" defaultValue="all" onChange={(e) => setSearchFilter(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="ERC20">ERC20</option>
                                    <option value="ERC721">ERC721</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        { account && (
                        <Col xs={2} md={2}>
                            <Form.Group controlId="formContractAccount" size="sm">
                                <Form.Label>Account</Form.Label>
                                <Form.Control size="sm" as="select" defaultValue="all" onChange={(e) => setSearchAccount(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value={account}>{account.slice(0,7)+'...'+account.slice(35,42)}</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    // ---------------------------------------------------------------------------------------------------------- //
    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {

        //if abi is empty, get it
        if (abis.length === 0) {
            getAbis()

        }

        //if contract is empty, load it
        if (contracts.length === 0) {
            getContracts()
            //console.log(contracts)
        }

        //searchValue.includes('0x'))

    }, [])

      if (loading) return (
        <main style={{ padding: "1rem 0" }} >
            <h4 className="Title">Contract List</h4>
            <Row className="justify-content-center">
                { listHeader() }
            </Row>
            Loading... <br/><Spinner animation="border" variant="primary" />
        </main>
      )
    //<input variant={variant[action.stateMutability]} type="text" className="form-control" placeholder={inputLabels[action.name]}/>
    // find the contract in the list


    // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} >
            <h4 className="Title">Contract List</h4>
            <Row className="justify-content-center">
                { listHeader() }
            </Row>
            <Row className="justify-content-center">
                <Card className="box">
                    <Card.Header>
                        <Card.Title>List</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive striped bordered className='font-small' size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th>Creator</th>
                                    <th>Type</th>
                                    <th>Balance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {contracts.map(function (item, index) {
                                if (
                                    ( item.address.includes(searchValue)
                                        || searchValue === ''
                                    )
                                    &&
                                    (searchFilter === 'all'
                                        || (searchFilter === 'ERC20' && item.isERC20)
                                        || (searchFilter === 'ERC721' && item.isERC721)
                                    )
                                    &&
                                    ( searchAccount === ''
                                        || searchAccount === 'all'
                                        || searchAccount === item.from
                                    )
                                    ) {

                                return (
                                    <tr key={index+1}>
                                        <td>{index + 1}</td>
                                        <td className='hover truncate'>{getAddress(item.address)}</td>
                                        <td><span>{linkCopyAddress(item.from)}</span></td>
                                        <td>{item.isERC20 ? <Link to={`/token/${item.address}`}><Badge variant="outline-secondary btn-list" size="sm"> ERC 20 </Badge></Link> : item.isERC721 ? <Badge variant="outline-secondary btn-list" size="sm"> ERC 721 </Badge> : null}</td>
                                        <td>{Math.round((item.balance / 10 ** 18) * 100000 ) / 100000}</td>
                                        <td><Link to={`/address/${item.address}`}><Button variant="outline-primary btn-list" size="sm"> View </Button>
                                            </Link> {
                                                abis.find(abi => abi.address === item.addr) ?
                                                <Link to={`/interface/${(item.address)}`}><Button variant="outline-primary btn-list" size="sm"> Interface </Button></Link>
                                                : <Button variant="outline-secondary btn-list" size="sm"> Interface </Button>
                                            }
                                        </td>
                                    </tr>
                                )
                                }
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Row>
        </main>
    );
}
export default Interfaces