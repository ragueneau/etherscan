import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import SearchBar from "./search_bar";
//import MetamaskConnect from './MetamaskConnect'
//                    <MetamaskConnect web3Handler={web3Handler} account={account} networkName={networkName} />

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
                        <Nav.Link as={Link} to="/tokens">Tokens</Nav.Link>
                        <Nav.Link as={Link} to="/faucet">Faucet</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <SearchBar />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;