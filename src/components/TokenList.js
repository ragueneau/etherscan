import { left } from "@popperjs/core";
import React from "react";
import { Image, Button, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { getAddress, linkCopyAddress } from '../class/Tools'

const TokenList = ({tokens, addToken}) => {
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
                        <td style={{textAlign: left}}>
                            {item.image !== '' ? (
                                <Image thumbnail src={item.image} alt={item.name} onClick={() => addToken(item.address)} title={'Add '+item.symbol+' to metamask'} style={{width: '32px'}} />
                            ) : ( <Image thumbnail src='https://etherscan.coeptix.net/token.png' alt={item.name} onClick={() => addToken(item.address)} title={'Add '+item.symbol+' to metamask'} style={{width: '32px'}} />
                             )} {item.name}
                        </td>
                        <td>{item.symbol}</td>
                        <td><Link title={item.address} to={`/address/${item.address}`}></Link>{linkCopyAddress(item.address)}</td>
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