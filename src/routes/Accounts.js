
import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Table, Card, Row, Col, Spinner, ListGroup } from 'react-bootstrap'
import TokenList from '../components/TokenList'
import { Link } from "react-router-dom";

import { getAddress, linkAddress } from '../class/Tools'

const axios = require('axios').default;

const Accounts = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [stats, setStats] = useState({})

    const [topBalances, setTopBalances] = useState([])
    const [topMiners, setTopMiners] = useState([])

    const [toptransactions, setTopTransactions] = useState([])
    //const [toptransfers, setTopTransfers] = useState([])
    //const [toptokens, setTopTokens] = useState([])
    const [topaddresses, setTopAddresses] = useState([])
    const [topcontracts, setTopContracts] = useState([])
    //const [topevents, setTopEvents] = useState([])
    //const [topblocksbyhash, setTopBlocksByHash] = useState([])

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

 
    useEffect(() => {
        let timer = setTimeout(() => {

            getTopMiners()
            getTopBalances()

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
                                            <th>Account</th>
                                            <th>Origin</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topBalances && topBalances.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name ? (<Link title={item.address} to={`/address/${item.address}`}>{item.name}</Link>) : (<Link label={item.address} to={`/address/${item.address}`}>{linkAddress(item.address)}</Link>)}</td>
                                            <td><Link label={item.blocknumber} to={`/block/${item.blocknumber}`}>{item.blocknumber}</Link></td>
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
                                            <th>Miner</th>
                                            <th>Blocks</th>
                                            <th>Total Rewards</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {topMiners && topMiners.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name ? (<Link label={item.miner} to={`/address/${item.miner}`}>{item.name}</Link>) : (<Link label={item.miner} to={`/address/${item.miner}`}>{linkAddress(item.miner)}</Link>)}</td>
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
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <br/>
                <Row>
                <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title>Top Contract by Value</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title>Top Contract by Tx</Card.Title>
                            </Card.Header>
                            <Card.Body className="std-card-info-body">
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
    );
}
export default Accounts