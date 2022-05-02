import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'


const Navigation = ({ web3Handler, account, networkName }) => {
    return (

        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    &nbsp; Dev Blockchain
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/">Blockchain</Nav.Link>
                        <Nav.Link as={Link} to="/">Tokens</Nav.Link>
                        <Nav.Link as={Link} to="/faucet">Faucet</Nav.Link>
                    </Nav>
                    <Button variant="outline-light">{networkName}</Button>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.coeptix.net/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(36, 42)}
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