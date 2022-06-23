//import React, { Component } from "react";
import { Card } from 'react-bootstrap'

const NavLastBlock = ({stats}) => {
    return (
        <Card className="nav-last-block">
            <Card.Body>
                <Card.Text>
        {stats.lastBlock}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NavLastBlock;