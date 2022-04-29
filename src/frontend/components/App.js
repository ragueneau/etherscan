// ---------------------------------------------------------------------------------------------------- //
//
// ---------------------------------------------------------------------------------------------------- //
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { ethers } from "ethers"

// Export ------------------------------------------------------------------------------------------- //
import './App.css';

import Navigation from './nav/Navbar';
import HTTP404 from './nav/404.js'

import Home from './Home.js'
import Address from './Address.js'
import Block from './Block.js'
import Contract from './Contract.js'
import Faucet from './Faucet.js'
import Token from './Token.js'
import Tx from './Tx.js'

// Contract Addresses ------------------------------------------------------------------------------ //
import FaucetAbi from '../contractsData/Faucet.json'
import FaucetAddress from '../contractsData/Faucet-address.json'

// Fonction ---------------------------------------------------------------------------------------- //
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [networkName, setNetworkName] = useState(null)
  const [faucet, setFaucet] = useState(null)

  // MetaMask Login/Connect ----------------------------------------------------------------------- //
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }

  // Load contracts -------------------------------------------------------------------------------- //
  const loadContracts = async (signer) => {

    // Get network chainid and name
    const network = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(network)

    // if on rinkeby network then use Rinkeby network
    if (window.ethereum && network === '0x4') {
      console.log('Rinkeby network');
      setNetworkName('Rinkeby')

    } else if (window.ethereum && network === '0x3') {
      console.log('Roptsten network');
      setNetworkName('Roptsten')

    } else if (window.ethereum && network === '0x2a') {
      console.log('Kovan network');
      setNetworkName('Kovan')

    } else if (window.ethereum && network === '0x5') {
      console.log('Goerli network');
      setNetworkName('Goerli')

    } else if (window.ethereum && network === '0x75c9') {
      console.log('CoeptIX network');
      setNetworkName('CoeptIX')
      FaucetAddress.address = '0xCAEB631af6e9A583A7DC5471E51B9E1E8b64bdBF'

    } else if (window.ethereum && network === '0x89') {
      console.log('Polygon network');
      setNetworkName('Polygon')

    } else if (window.ethereum && network === '0x13881') {
      console.log('Mumbai network');
      setNetworkName('Mumbai')

    } else if (window.ethereum && network === '0x539') {
      console.log('Ganache localnet');
      setNetworkName('Ganache')

    } else {
      console.log('Mainnet network');
      setNetworkName('Mainnet')

    }

    // Get deployed copies of contracts
    const faucet = new ethers.Contract(FaucetAddress.address, FaucetAbi.abi, signer)
    setFaucet(faucet)
    setLoading(false)
  }

  // Render ---------------------------------------------------------------------------------------- //
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} networkName={networkName}/>
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home networkName={networkName} account={account}/>
              } />
              <Route path="/address/:walletAddress" element={
                <Address networkName={networkName} account={account}/>
              } />
              <Route path="/contract/:contractAddress" element={
                <Contract networkName={networkName} account={account}/>
              } />
              <Route path="/block/:blockNumber" element={
                <Block networkName={networkName} account={account}/>
              } />
              <Route path="/token/:walletAddress" element={
                <Token networkName={networkName} account={account}/>
              } />
              <Route path="/tx/:transactionHash" element={
                <Tx networkName={networkName} account={account}/>
              } />
              <Route path="/faucet" element={
                <Faucet networkName={networkName} account={account}/>
              } />
              <Route path="*" element={
                <HTTP404 faucet={faucet} networkName={networkName} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
