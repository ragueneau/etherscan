import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Home = ({ networkName }) => {
    const [loading, setLoading] = useState(false)
    const [lastBlockNumber, setLastBlockNumber] = useState(0)

    //const [account, setAccount] = useState([])
    console.log('Network:', networkName)

    //get last block number
    const getLastBlockNumber = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const blockNumber = await provider.getBlockNumber()
        console.log('Last block number:', blockNumber)
        setLastBlockNumber(blockNumber)
        return blockNumber
    }

    useEffect(() => {
        getLastBlockNumber()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading home...</h2>
        </main>
      )
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h2>CoeptIX Ethereum ETH Explorer</h2>
                {lastBlockNumber}
            </div>
        </div>

    );
}
export default Home