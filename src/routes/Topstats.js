
import Config from '../config.json'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import TokenList from '../components/TokenList'
import { Link } from "react-router-dom";

const axios = require('axios').default;

const Topstats = ({ networkName }) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    useEffect(() => {

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Top Statistics</h4>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Top Statistics</h4>

        </main>
    );
}
export default Topstats