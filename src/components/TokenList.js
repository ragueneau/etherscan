import React from "react";
import { Button, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const TokenList = ({tokens}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Address</th>
                    <th>Decimals</th>
                    <th>Total Supply</th>
                    <th>Wrapped</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tokens ? tokens.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.symbol}</td>
                        <td><Link to={`/address/${item.address}`}>{item.address.slice(0, 9) + '...'+item.address.slice(33, 42)}</Link></td>
                        <td>{item.decimals}</td>
                        <td>{item.supply / 10 ** 18 }</td>
                        <td>{item.balance / 10 ** 18 }</td>
                        <td>
                            <Button variant="secondary btn-list" size="sm" as={Link} to={`/token/${item.address}`}>View
                            </Button> <Button variant="secondary btn-list" size="sm" as={Link} to={`/interface/${item.address}`}>Interface</Button>
                        </td>
                    </tr>
                )): null}
            </tbody>
        </Table>
    );
};
export default TokenList;