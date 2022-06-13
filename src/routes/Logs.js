import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
//import { Link } from "react-router-dom";

import TransactionList from '../components/TransactionList'

//http://127.0.0.1:3000/logs/0x4edDe623379B27db9B0283E917F4c130963cd676/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

const axios = require('axios').default;

const Logs = ({ networkName }) => {
    const params = useParams()

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)


    const getLatestEvent = async () => {
        //get contract abi
        console.log(params.contract)
        const response = await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address=' + params.contract + '&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            const abi = response.data.result
            const provider = new ethers.providers.JsonRpcProvider(Config.node);
            const contract = new ethers.Contract(params.contract, abi, provider);

            //get the topics hash from the abi
            //const topics = contract.interface.events[0].topics
            console.log(contract.interface.events)

            //get events
            contract.queryFilter(params.topic).then(function(filter) {
                    console.log(filter)
            })

        }
        )
        .catch(function (error) {
            // handle error
            console.log(error);
        }
        )
        .then(function () {
            // always executed
        }
        );
    }



    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getLatestEvent()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Transactions</h5>
          Loading transaction for block #{params.blockNumber}
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
              <h5>Logs</h5>
              {params.topic}
              {params.address}

            </div>
        </div>
    );
}
export default Logs