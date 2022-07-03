import React from "react";
import { Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

const AddressTxTable = ({txs, walletAddress}) => {
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Table className="event-table" striped bordered hover responsive variant="light">
            <thead>
                <tr>
                    <th>Txn Hash</th>
                    <th>Method</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th></th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Tx Fee</th>
                </tr>
            </thead>
            <tbody>
            {txs.map((item, idx) => (
                <tr key={idx}>
                    <td><Link to={`/tx/${item.hash}`}>{item.hash.slice(0, 7) + '...'}</Link></td>
                    <td><Button variant="secondary btn-list" size="sm" className="ml-2">{item.method}</Button></td>
                    <td><Link to={`/block/${item.blockNumber}`}>{item.blockNumber}</Link></td>
                    <td>{item.age}</td>
                    <td><Link to={`/address/${item.from}`}>{item.from.slice(0, 7) + '...'+item.from.slice(38, 42)}</Link></td>
                    <td>{item.from === walletAddress ? <Button variant="danger btn-list" size="sm" className="ml-2"> OUT </Button> : <Button variant="success btn-list" size="sm" className="ml-2"> IN </Button> }</td>
                    <td>{item.to ? <span><Link to={`/address/${item.to}`}>{item.to.slice(0, 7) + '...'+item.to.slice(38, 42)}</Link></span> : <span>Contract creation</span>}</td>
                    <td>{(item.value / 10 ** 18).toString()} eth</td>
                    <td>{(item.gas / 10 ** 0).toString()} gwei</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};
export default AddressTxTable;