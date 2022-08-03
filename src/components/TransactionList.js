import React from "react";
import { Card, Button, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { getAddress, linkCopyAddress } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

const TransactionList = ({txs}) => {
    return (
        <Card >
            <Card.Header>
                <Card.Title className="std-card-title">Transaction List</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive size="sm" >
                    <thead>
                        <tr>
                            <th>Txn Hash</th>
                            <th>Method</th>
                            <th>Block</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                            <th>Txn Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txs ? txs.map((item, idx) => (
                            <tr key={idx}>
                                <td><Link to={`/tx/${item.hash}`}>{item.hash ? item.hash.slice(0, 7) + '...': null}</Link></td>
                                <td><Button variant="secondary btn-list" size="sm" className="ml-2">{item.method}</Button></td>
                                <td><Link to={`/block/${item.blockNumber}`}>{item.blockNumber}</Link></td>
                                <td><Link to={`/address/${item.from}`}>{item.from ? linkCopyAddress(item.from) : null}</Link></td>
                                <td>{item.to ? <Link to={`/address/${item.to}`}>{linkCopyAddress(item.to)}</Link> : null}</td>
                                <td>{item.value / 10 ** 18} ether</td>
                                <td>{item.gas / 10 ** 0} gwei</td>
                            </tr>
                        )): null}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
export default TransactionList;