import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Table, Row, Col, Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import TransactionList from '../components/TransactionList'

//http://127.0.0.1:3000/logs/0x4edDe623379B27db9B0283E917F4c130963cd676/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
//http://127.0.0.1:3000/logs/0x7d092def45Ba6960DF1A560E3990DAd430884C4d/0x966369fa3967a9adee1d13e1dfd82bfa577648627c3a450da8b4653b0425531e

const axios = require('axios').default;


const Logs = ({ networkName }) => {
    const params = useParams()
    const [events, setEvents] = useState([])

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async () => {

        await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address=' + params.contract + '&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            // handle success
            const abi = response.data.result
            const provider = new ethers.providers.JsonRpcProvider(Config.node);
            const contract = new ethers.Contract(params.contract, abi, provider);
            const topics = contract.interface.events

            for (let key in topics) {
                //convert the key to bytelike
                const signature = keccak256(toUtf8Bytes(key));

                //get events
                contract.queryFilter(signature, -100).then(function(filter) {

                    //for event in the filter array
                    for (let i = 0; i < filter.length; i++) {
                        const event = filter[i]

                        // insert if transactionHash is not in the array
                        if ( !events.find(item => item.transactionHash === event.transactionHash) ) {
                            events.unshift(event)
                        }
                    }

                    setEvents(events)
                })
            }

        }).catch(function (error) {
            // handle error
            console.log(error);

        }).then(function () {
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
        }, 1000);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h5>Logs</h5>
            <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
              <h5>Logs</h5>
              Contract: <Link to={`/logs/${params.contract}`}>{params.contract}</Link><br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Block Number</th>
                            <th>Event</th>
                            <th>tx#</th>
                            <th>Log#</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
              {events ? events.map((event, idx) => (
                <tr key={idx}>
                    <td><Link to={`/block/${event.blockNumber}`}>{event.blockNumber}</Link></td>
                    <td>{event.event}</td>
                    <td><Link to={`/tx/${event.transactionHash}`}>{event.transactionIndex}</Link></td>
                    <td>{event.logIndex}</td>
                    <td>{event.address}</td>
                </tr>
                )): null}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
export default Logs