import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
//import MetamaskConnect from './MetamaskConnect'
//                    <MetamaskConnect web3Handler={web3Handler} account={account} networkName={networkName} />

const Navigation = ({ web3Handler, account, networkName }) => {
    return (

        <Navbar expand="lg" bg="dark" variant="dark" classMap="NavBar">
            <Container>
                <Navbar.Brand href="/">
                    &nbsp; EVM Explorer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tokens">Tokens</Nav.Link>
                        <Nav.Link as={Link} to="/interfaces">Contracts</Nav.Link>
                        <Nav.Link as={Link} to="/apps">Applications</Nav.Link>
                    </Nav>
                    <Button variant="outline-light">{networkName}</Button>
                    <Nav className="ml-auto">
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.coeptix.net/address/${account}`}
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm nopadding">
                                <Button variant="outline-light">
                                    {account.slice(0, 6) + '...' + account.slice(36, 42)}
                                </Button>
                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;

//<Nav.Link as={Link} to="/">Blockchain</Nav.Link>
//<Nav.Link as={Link} to="/">Analytics</Nav.Link>
//<Nav.Link as={Link} to="/">Resources</Nav.Link>
