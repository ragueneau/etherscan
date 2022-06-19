import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { ethers } from "ethers"

import Applications from '../components/Applications'

const axios = require('axios').default;

const Apps = ({networkName, chainId }) => {
    const [loading, setLoading] = useState(true)
    const [apps, setApps] = useState([])

    const getApplications = async () => {

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
        <main style={{ padding: "1rem 0" }}>
          <h5>Applications</h5>
          Loading Apps<Spinner animation="border" style={{ display: 'flex' }} />
        </main>
    )

    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Applications</h5>
                <Applications applications={apps} />
            </div>
        </div>
    );
};
export default Apps;