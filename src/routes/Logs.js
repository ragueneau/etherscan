import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import ContractEvents from '../components/ContractEvents'

//http://127.0.0.1:3000/logs/0x4edDe623379B27db9B0283E917F4c130963cd676/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
//http://127.0.0.1:3000/logs/0x7d092def45Ba6960DF1A560E3990DAd430884C4d/0x966369fa3967a9adee1d13e1dfd82bfa577648627c3a450da8b4653b0425531e

const axios = require('axios').default;


const Logs = ({ networkName }) => {
    let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

    const params = useParams()
    const [events, setEvents] = useState([])
    const [abi, setAbi] = useState([])

    const [loading, setLoading] = useState(true)

    // ---------------------------------------------------------------------------------------------------- //
    const getLatestEvent = async () => {

        let provider = new ethers.providers.JsonRpcProvider(Config.node);

        //verify if metamask is connected
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        const contract = new ethers.Contract(params.contract, abi, provider);
        const topics = contract.interface.events

        for (let key in topics) {
            //convert the key to bytelike
            const signature = keccak256(toUtf8Bytes(key));

            //get events
            await contract.queryFilter(signature, -1000).then(function(filter) {

                //for event in the filter array
                for (let i = 0; i < filter.length; i++) {
                    const event = filter[i]
                    event.txkey = event.blockNumber +"-"+ event.transactionIndex +"-"+ event.logIndex +"-"+ event.transactionHash

                    // insert if transactionHash is not in the array
                    if ( !events.find(item => item.txkey === event.txkey) ) {
                        events.unshift(event)

                    }
                }
                //reverse sort by txkey
                events.sort((a, b) => {
                    if (a.txkey < b.txkey) {
                        return 1;
                    }
                    if (a.txkey > b.txkey) {
                        return -1;
                    }
                    return 0;
                })
                setEvents(events)
            })
        }
    }

    const getAbi = async () => {
        await axios.get(Config.restAPI + '/api?module=contract&action=getabi&address=' + params.contract + '&apikey=' + Config.ApiKeyToken)
        .then(function (response) {
            setAbi(response.data.result)
        })
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    function copyButton(address) {
        return <Button variant="link" className="copy-button" onClick={() => copyToClipboard(address)}>{copyIcon}</Button>
    }
    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {

            //if abi is empty, get it
            if (abi.length === 0) {
                getAbi()
            }

            getLatestEvent()
            setLoading(false)

        }, 1000);
        return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Contract Event Logs</h4>
            <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
              <h4 className='Title'>Contract Event Logs</h4>
              Contract: <Link to={`/address/${params.contract}`}>{params.contract}</Link> {copyButton(params.contract)}<br/>
                <ContractEvents events={events}/>
            </main>
    );
}
export default Logs