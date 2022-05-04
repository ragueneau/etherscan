import React from "react";
import { Button, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const TransactionList = ({txs}) => {
    return (
        <Table striped bordered hover>
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
                        <td><Button variant="secondary" size="sm" className="ml-2">{item.input ? item.input.slice(0, 10): null}</Button></td>
                        <td><Link to={`/address/${item.blockNumber}`}>{item.blockNumber}</Link></td>
                        <td><Link to={`/address/${item.from}`}>{item.from ? item.from.slice(0, 9) + '...'+item.from.slice(33, 42) : null}</Link></td>
                        <td>{item.to ? <Link to={`/address/${item.to}`}>{item.to.slice(0, 9) + '...'+item.to.slice(33, 42)}</Link> : null}</td>
                        <td>{item.value / 10 ** 18} xETH</td>
                        <td>{item.gas} xwei</td>
                    </tr>
                )): null}
            </tbody>
        </Table>
    );
};

export default TransactionList;