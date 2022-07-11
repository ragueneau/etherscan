
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


    const getStats = async () => {
        let stats = {}
        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

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
            enddate: todayDate,
            dailytxnfee: 0,
            dailynetutilization: 0,
            avgdifficulty: 0,
            avgtxnperblock: 0,
            avgtxnperday: 0,
            avgtxnperhour: 0,
            avgtxnperminute: 0
        }
        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topminers&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topminers = response.data.result
        })

        //get stats dailytxnfee
        await axios.get(Config.restAPI + '/api?module=stats&action=topbalances&apikey=' + Config.ApiKeyToken+'&startdate='+todayDate+'&enddate='+todayDate)
        .then(function (response) {
            stats.topbalances = response.data.result
        })

        console.log(stats)
        setStats(stats)

    }


    useEffect(() => {
        let timer = setTimeout(() => {
            //setCount((count) => count + 1);

            getStats()

            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
      }, [])

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className="Title">Accounts</h4>
                <Row>

                    <Col md={6}>
                    <Card className="std-card-info">
                            <Card.Header>
                                <Card.Title className="std-card-title">Top Balances</Card.Title>
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
                                    {stats.topbalances && stats.topbalances.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name ? (<Link label={item.address} to={`/account/${item.address}`}>{item.name}</Link>) : (<Link label={item.address} to={`/account/${item.address}`}>{linkAddress(item.address)}</Link>)}</td>
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
                                <Card.Title className="std-card-title">Top Transactions</Card.Title>
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
                                <Card.Title className="std-card-title">Top Miners</Card.Title>
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
                                    {stats.topminers && stats.topminers.map((item, index) => (
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
                                <Card.Title className="std-card-title">Top Gas Used</Card.Title>
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