// ---------------------------------------------------------------------------------------------------- //
//
// ---------------------------------------------------------------------------------------------------- //
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { ethers } from "ethers"

// Export ------------------------------------------------------------------------------------------- //
import './App.css';

import Navigation from './components/Navbar';
import HTTP404 from './components/404.js'
import SearchBar from './components/search_bar';

import Home from './routes/Home.js'
import Address from './routes/Address.js'
import Block from './routes/Block.js'
import Contract from './routes/Contract.js'
import Faucet from './routes/Faucet.js'
import Token from './routes/Token.js'
import Tokens from './routes/Tokens.js'
import Tx from './routes/Tx.js'
import Txs from './routes/Txs.js'
import Profile from './routes/Profile.js'

// Configuration ----------------------------------------------------------------------------------- //
import Config from './config.json'
//import ERC20Abi from './contractsData/erc20-abi.json'
//import FaucetAbi from './contractsData/Faucet.json'

//import the axios library
import axios from 'axios'

const FaucetAddress = Config.contracts.faucet;

// Fonction ---------------------------------------------------------------------------------------- //
function App() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [networkName, setNetworkName] = useState('network')
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
  const loadNetwork = async () => {

      // Get network chainid and name
      const network = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('NetworkID:', network, )

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

      } else if (window.ethereum && network === '0xa86a') {
        console.log('Avalanche Mainnet');
        setNetworkName('Avalanche')

      } else if (window.ethereum && network === '0x1') {
        console.log('Mainnet');
        setNetworkName('Mainnet')

      } else {
        console.log('Unknown network');
        setNetworkName('Unknown')

      }

  }
  // Load contracts -------------------------------------------------------------------------------- //
  const loadContracts = async (signer) => {

    //setLoading(true)

    const apicall = Config.restAPI + '/api?module=contract&action=getabi&address=' + Config.contracts.faucet.address + '&apikey=' + Config.ApiKeyToken
    const response = await axios.get(apicall)
    .then(function (response) {
      console.log(response.data.result)
        const faucet = new ethers.Contract(Config.contracts.faucet.address, response.data.result, signer)
        console.log('load_contract', faucet, apicall)

        setFaucet(faucet)
    })
    .catch(function (error) {
     // handle error
      console.log(error);
    })
   .then(function () {
      // always executed
    });
    //setFaucetContract


    setLoading(false)
  }

  const getabi = async (contractAddress) => {
    const network = await window.ethereum.request({ method: 'eth_chainId' });

    const apicall = Config.restAPI + '/api?module=contract&action=getabi&address=' + contractAddress + '&apikey=' + Config.ApiKeyToken
    const response = await axios.get(apicall)
    .then(function (response) {
      //setTxs(response.data.result)
      console.log(apicall, response.data.result)
    })
    .catch(function (error) {
     // handle error
      console.log(error);
    })
   .then(function () {
      // always executed
    });
  }

  // Render ---------------------------------------------------------------------------------------- //
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Navigation web3Handler={web3Handler} account={account} networkName={networkName}/>
        </div>
        <div className="container">
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
              <Txs networkName={networkName} account={account}/>
            } />
            <Route path="/txs/:blockNumber" element={
              <Txs networkName={networkName} account={account}/>
            } />
            <Route path="/faucet" element={
              <Faucet faucet={faucet} networkName={networkName} account={account}/>
            } />
            <Route path="/profile" element={
              <Profile networkName={networkName} account={account}/>
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
