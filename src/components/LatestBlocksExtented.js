
import React from "react";
import { Table, Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { getAddress, unixToDate, linkAddress } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

const LatestBlocks = ({items}) => {
    return (
        <Card classMap="shadowCard">
            <Card.Header className="std-card-title"></Card.Header>
            <Card.Body className="std-card-info">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Block</th>
                            <th>Timestamp</th>
                            <th>Time</th>
                            <th>tx</th>
                            <th>uncles</th>
                            <th>Gas Used</th>
                            <th>Gas Limit</th>
                            <th>Difficulty</th>
                            <th>Miner</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td><Link to={`/block/${item.number}`}>{item.number}</Link></td>
                            <td>{unixToDate(item.timestamp)}</td>
                            <td>{item.duration} {item.duration > 1 ? 'secs' : 'sec'}</td>
                            <td>{item.transactions.length}</td>
                            <td>{item.uncles}</td>
                            <td>{parseInt(item.gasUsed)} gwei</td>
                            <td>{parseInt(item.gasLimit)} gwei</td>
                            <td>{item.difficulty}</td>
                            <td>{linkAddress(item.miner,1)}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </Card.Body>
        </Card>
    );
};
export default LatestBlocks;