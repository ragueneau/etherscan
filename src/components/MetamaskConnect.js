
import React from "react";
import { Nav, Button  } from 'react-bootstrap';
import { Link } from "react-router-dom";

const MetamaskConnect = ({web3Handler, account, networkName}) => {
    return (
        <div>
        <Button variant="outline-dark">{networkName}</Button>

            {account ? (
                <Link
                    href={`/profile`}
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    <Button variant="outline-light">
                        {account.slice(0, 5) + '...' + account.slice(36, 42)}
                    </Button>

                </Link>
            ) : (
                <Button onClick={web3Handler} variant="outline-dark">Connect Wallet</Button>
            )}
        </div>
    );
};
export default MetamaskConnect;