import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Col, Row,Spinner } from 'react-bootstrap'
import { ethers } from "ethers"

import Applications from '../components/Applications'

const axios = require('axios').default;

const Apps = ({networkName }) => {
    const [loading, setLoading] = useState(true)
    const [apps, setApps] = useState([])

    const getApplications = async () => {
        const _chainId = await window.ethereum.request({ method: 'eth_chainId' });

        //chainid hex to int
        const chainId = parseInt(_chainId, 16);

        const response = await axios.get(Config.restAPI + '/api?module=app&action=getapplist&chainId='+ parseInt(chainId) + '&apikey=' + Config.ApiKeyToken)
        const applications = response.data.result
        console.log(applications,chainId)

        setApps(applications)
        return applications
    }

    useEffect(() => {
        getApplications()
        setLoading(false)

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Applications</h4>
          Loading Apps<Spinner animation="border" style={{ display: 'flex' }} />
        </main>
    )

    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Applications</h4>
            <Row>
                <Col>
                    <Applications applications={apps} />
                </Col>
            </Row>
        </main>
    );
};
export default Apps;