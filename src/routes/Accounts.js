
import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Button, Table, Card, Row, Col, Spinner, ListGroup } from 'react-bootstrap'
import TokenList from '../components/TokenList'
import { Link } from "react-router-dom";

import { getAddress, linkAddress } from '../class/Tools'

const axios = require('axios').default;

const Accounts = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [stats, setStats] = useState({})

    const [topBalances, setTopBalances] = useState([
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 },
        {  name: '0x', balance: 0 }
    ])
    const [topMiners, setTopMiners] = useState([
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 },
        {  name: '0x', blocks: 0, totalrewards: 0 }
    ])

    const [topAddressesTxns, setTopAddressesTxns] = useState([]);

    const [topTransactions, setTopTransactions] = useState([])

    const [topContracts, setTopContracts] = useState([])
    const [topContractsTxns, setTopContractsTxns] = useState([])
    const [topGasUsed, setTopGasUsed] = useState([])

    const getTopMiners = async () => {
        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }

        await axios.get(Config.restAPI + '/api?module=stats&action=topminers&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topminers = response.data.result
            setTopMiners(stats.topminers)
        })

    }

    const getTopBalances = async () => {
        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topbalances&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topbalances = response.data.result
            setTopBalances(stats.topbalances)
        })

    }

    const getTopTransactions = async () => {
        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topaddressestxns&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topTransactions = response.data.result
            setTopTransactions(stats.topTransactions)
        })
    }

    const getTopContracts = async () => {

        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topcontracts&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topcontracts = response.data.result
            setTopContracts(stats.topcontracts)
        })

    }

    const getTopContractsTxns = async () => {

        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topcontractstxns&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topcontractstxns = response.data.result
            setTopContractsTxns(stats.topcontractstxns)
        })

    }

    const getTopGasUsed = async () => {
        let stats = {}

        //today date yyyy-mm-dd
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = yyyy + '-' + mm + '-' + dd

        //yesterday date yyyy-mm-dd
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const ydd = String(yesterday.getDate()).padStart(2, '0')
        const ymm = String(yesterday.getMonth() + 1).padStart(2, '0')
        const yyyy2 = yesterday.getFullYear()
        const yesterdayDate = yyyy2 + '-' + ymm + '-' + ydd

        stats = {
            startdate: yesterdayDate,
            enddate: todayDate
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topgasused&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topgasused = response.data.result
            setTopGasUsed(stats.topgasused)
        })
    }

    useEffect(() => {
        let timer = setTimeout(() => {

            getTopMiners()
            getTopBalances()
            getTopContracts()
            getTopContractsTxns()
            getTopTransactions()
            getTopGasUsed()

            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer)
      })

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className="Title">Accounts</h4>
                <Row>

                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title >Top Balances</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Account</th>
                                            <th>Origin</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topBalances && topBalances.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<span>{linkAddress(item.address)}</span>)}</td>
                                            <td><Link title={item.blocknumber} to={`/block/${item.blocknumber}`}>{item.blocknumber}</Link></td>
                                            <td>{item.balance/1000000000000000000} xEth</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title >Top Transactions</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Addresses</th>
                                            <th>Txns Count</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topTransactions && topTransactions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<span>{linkAddress(item.address)}</span>)}</td>
                                            <td>{item.txnscount}</td>
                                            <td>    </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <br/>
                <Row>

                    <Col md={6}>
                        <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title >Top Miners</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Miner</th>
                                            <th>Blocks</th>
                                            <th>Total Rewards</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topMiners && topMiners.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.miner} to={`/address/${item.miner}`}>{item.name}</Link>) : (<span>{linkAddress(item.miner)}</span>)}</td>
                                            <td>{item.blocks}</td>
                                            <td>{item.totalrewards/1000000000} xEth</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title >Top Gas Used</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Addresses</th>
                                            <th>Txns Count</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topGasUsed && topGasUsed.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<span>{linkAddress(item.address)}</span>)}</td>
                                            <td>{item.txnscount}</td>
                                            <td>    </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <br/>
                <Row>
                <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title>Top Contracts by Value</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Contracts</th>
                                            <th>Origin</th>
                                            <th>Total Wrapped xEth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topContracts && topContracts.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<span>{linkAddress(item.address)}</span>)}</td>
                                            <td><Link title={item.blocknumber} to={`/block/${item.blocknumber}`}>{item.blocknumber}</Link></td>
                                            <td>{item.balance/1000000000000000000} xEth</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title>Top Contracts by Tx</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Contracts</th>
                                            <th>Txns Count</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topContractsTxns && topContractsTxns.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<span>{linkAddress(item.address)}</span>)}

                                            {item.erctype ? (<Button variant="outline-primary" size="sm" >{item.erctype}</Button>) : (<span></span>)}

                                            </td>
                                            <td>{item.txnscount}</td>
                                            <td>    </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
    );
}
export default Accounts