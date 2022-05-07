
import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const LatestBlocks = ({items}) => {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Text>
                    <ul>
                    {items.map((item, idx) => (
                        <li key={idx} className="list-group-item">
                        <Link to={`/block/${item.number}`}>{item.number}</Link> Hash: <Link to={`/block/${item.number}`}>{item.hash.slice(0, 15) + '...'}</Link><br/>
                        {item.transactions.length} transaction(s)
                        <br/>
                        {item.timediff} secs ago
                        </li>
                    ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default LatestBlocks;