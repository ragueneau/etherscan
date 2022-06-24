// ------------------------------------------------------------------------------------------------- //
// Etherscan
// ------------------------------------------------------------------------------------------------- //

// Configuration ----------------------------------------------------------------------------------- //
import Config from './config.json'

// Modules ----------------------------------------------------------------------------------------- //
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"

import axios from 'axios'

// Export ------------------------------------------------------------------------------------------ //
import './App.css';

import Navigation from './components/Navbar';
import HomeNavigation from './components/HomeNavbar';
import HTTP404 from './components/404.js'

//import SearchBar from './components/SearchBar';

// Routes ------------------------------------------------------------------------------------------ //
import Home from './routes/Home.js'
import Address from './routes/Address.js'
import Block from './routes/Block.js'
import Contract from './routes/Contract.js'
import Logs from './routes/Logs.js'
import Token from './routes/Token.js'
import Tokens from './routes/Tokens.js'
import TokensTx from './routes/TokensTx.js'
import Tx from './routes/Tx.js'
import Txs from './routes/Txs.js'
import Profile from './routes/Profile.js'
import Applications from './routes/Apps.js'
import Footer from './components/Footer.js';
import Interface from './routes/Interface.js'
import Interfaces from './routes/Interfaces.js'

// Functions --------------------------------------------------------------------------------------- //
function App() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [networkName, setNetworkName] = useState('network')
  const [chainId, setChainId] = useState(null)
  const [stats, setStats] = useState({
    BlockNumber: 0
  })

  // MetaMask Login/Connect ------------------------------------------------------------------------ //
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

  }

  const loadNetwork = async () => {

    //get the network chain id
    const _chainId = await window.ethereum.request({ method: 'eth_chainId' });

    //chainid hex to int
    const chainIdInt = parseInt(_chainId, 16);
    setChainId(chainIdInt)

    //if chain id is 1, then it is mainnet (eth)
    if (chainIdInt === 1) {
      setNetworkName('Mainnet')
    } else if (chainIdInt === 3) {
      setNetworkName('Ropsten')
    } else if (chainIdInt === 4) {
      setNetworkName('Rinkeby')
    } else if (chainIdInt === 5) {
      setNetworkName('Goerli')
    } else if (chainIdInt === 10) {
      setNetworkName('Optimism')
    } else if (chainIdInt === 42) {
      setNetworkName('Kovan')
    } else if (chainIdInt === 56) {
      setNetworkName('Binance')
    } else if (chainIdInt === 137) {
      setNetworkName('Polygon Mainnet')
    } else if (chainIdInt === 250) {
      setNetworkName('Fantom')
    } else if (chainIdInt === 1285) {
      setNetworkName('Moonriver')
    } else if (chainIdInt === 1337) {
      setNetworkName('Ganache')
    } else if (chainIdInt === 31337) {
      setNetworkName('Hardhat')
    } else if (chainIdInt === 35478) {
      setNetworkName('CoeptIX')
    } else if (chainIdInt === 42161) {
      setNetworkName('Arbitrum One')
    } else if (chainIdInt === 43114) {
      setNetworkName('Avalanche Mainnet')
    } else {
      setNetworkName('Unknown '+chainIdInt)
    }

    console.log('Network: '+networkName)
    console.log('ChainID: '+chainIdInt)
  }

  useEffect(() => {

    //verify metamask is installed
    if (window.ethereum) {
      //on network change, loadNetwork
      window.ethereum.on('chainChanged', async (chainId) => {
        window.location.reload()
        await loadNetwork()
      })

      //print the url to the console
      console.log(window.location)
      console.log(stats)
      loadNetwork()

      console.log('!Chain changed to ' + parseInt(chainId));
    } else {
      console.log('No Metamask detected');
      setNetworkName('CoeptIX')
      setChainId(35478)
    }
  }, [])

  // Render ---------------------------------------------------------------------------------------- //
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {window.location.pathname === '/'
          ? <Navigation web3Handler={web3Handler} account={account} networkName={networkName} stats={stats} />
          : <Navigation web3Handler={web3Handler} account={account} networkName={networkName} stats={stats} />
      }

        </div>
        <div className="container extra-container">
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
          <Routes>
            <Route exact path="/" element={
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
            <Route path="/token/:tokenAddress" element={
              <Token networkName={networkName} account={account}/>
            } />
            <Route path="/tokens" element={
              <Tokens networkName={networkName} account={account}/>
            } />
            <Route path="/tx/:transactionHash" element={
              <Tx networkName={networkName} account={account}/>
            } />
            <Route path="/txs" element={
              <Txs networkName={networkName} account={account} chainId={chainId}/>
            } />
            <Route path="/txs/:blockNumber" element={
              <Txs networkName={networkName} account={account}/>
            } />
            <Route path="/tokentxns/" element={
              <TokensTx networkName={networkName} account={account}/>
            } />
            <Route path="/contractsim/:contract" element={
              <Interface networkName={networkName} account={account}/>
            } />
            <Route path="/interface/:contract" element={
              <Interface networkName={networkName} account={account}/>
            } />
            <Route path="/interfaces" element={
              <Interfaces networkName={networkName} account={account}/>
            } />
            <Route path="/profile" element={
              <Profile networkName={networkName} account={account}/>
            } />
            <Route path="/apps" element={
              <Applications networkName={networkName} account={account} />
            } />
            <Route path="/logs/:contract/:topic" element={
              <Logs networkName={networkName} account={account}/>
            } />
            <Route path="/logs/:contract" element={
              <Logs networkName={networkName} account={account}/>
            } />
            <Route path="*" element={
              <HTTP404/>
            } />
          </Routes>)}
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;