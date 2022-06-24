
import Config from '../config.json'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import TokenList from '../components/TokenList'
import { Link } from "react-router-dom";

const axios = require('axios').default;

const Accounts = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    useEffect(() => {

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Accounts</h5>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Top Accounts</h5>

            </div>
        </div>
    );
}
export default Accounts