import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap'
import NavLastBlock from "./NavLastBlock";
//import MetamaskConnect from './MetamaskConnect'
//                    <MetamaskConnect web3Handler={web3Handler} account={account} networkName={networkName} />

const Navigation = ({ web3Handler, setNetwork, account, networkName, stats }) => {
    return (

        <Navbar expand="lg"variant="dark" classMap="NavBar">
            <Container>
                <Navbar.Brand href="/" >
                    <img
                        src="/logo192.png"
                        width="32"
                        height="32"
                        className="d-inline-block align-top"
                        />
                    &nbsp; <span className="navbar-brand ">EVM Explorer</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        <NavDropdown title="Blockchain" id="collasible-nav-blockchain">
                            <NavDropdown.Item as={Link} to="/accounts">Top Accounts</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/* <NavDropdown.Item as={Link} to="/txs">View Transactions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/txsPending">View Pending Transactions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/txsInternal">View Internal Transactions</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            <NavDropdown.Item as={Link} to="/blocks">View Blocks</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/interfaces">Contracts</NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Tokens" id="collasible-nav-tokens">
                            <NavDropdown.Item as={Link} to="/tokens">Token List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns">View ERC20 Transfers</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/tokens-nft">ERC721 NFT Collections</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns-nft">View ERC721 Transfers</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/tokens-nft1151">ERC1151 NFT Collections</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns-nft1151">View ERC1151 Transfers</NavDropdown.Item> */}
                        </NavDropdown>

                        <NavDropdown title="Resources" id="collasible-nav-resources">
                            <NavDropdown.Item as={Link} to="/apps">Applications</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/faucet">Auth Faucet</NavDropdown.Item>
                            <NavDropdown.Item href="http://172.105.29.6:8258/" target="_blank">PoW Faucet</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="http://172.105.29.6:3000/" target="_blank">CoeptIX Network Stats</NavDropdown.Item>
                            <NavDropdown.Item href="https://uptime.coeptix.com/status/coeptix-testnet" target="_blank">CoeptIX Network Status</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="http://netstats.nopy.org:3000/" target="_blank">Hellnet Network Stats</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://documenter.getpostman.com/view/15658566/UyxeoTrH" target="_blank">API Documentation</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                </Navbar.Collapse>
                <NavLastBlock stats={stats} network={networkName}/>

            </Container>
        </Navbar>
    )

}

export default Navigation;

//<Nav.Link as={Link} to="/apps">Applications</Nav.Link>
//<Nav.Link as={Link} to="/">Blockchain</Nav.Link>
//<Nav.Link as={Link} to="/">Analytics</Nav.Link>
//<Nav.Link as={Link} to="/">Resources</Nav.Link>