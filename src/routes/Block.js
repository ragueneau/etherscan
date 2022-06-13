import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import Config from '../config.json'

import BlockInfo from '../components/BlockInfo'

const Block = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const blockNumber = parseInt(params.blockNumber)
    const [blockContent, setBlockContent] = useState([{
        number: blockNumber,
        blockHash: '',
        blockTransactions: [],
    }])

    //get last block number
    const getBlockNumber = async () => {
        let blockTransactions = {}

        if ( blockNumber !== blockContent.number ) {
            console.log('getBlockNumber')
            console.log(blockNumber , blockContent.number)

            const provider = new ethers.providers.JsonRpcProvider(Config.node)
            blockTransactions = await provider.getBlockWithTransactions(blockNumber)

            blockTransactions.timediff = Math.round(+new Date()/1000) - blockTransactions.timestamp
            const date = new Date(blockTransactions.timestamp * 1000)
            blockTransactions.humandate = date.toString()
        } else {
            blockContent.timediff = Math.round(+new Date()/1000) - blockContent.timestamp

            const date = new Date(blockContent.timestamp * 1000)
            blockContent.humandate = date.toString()
            blockTransactions = blockContent
        }

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            if ( blockNumber !== blockContent.number ) {
                setLoading(true)
            }
            getBlockNumber()
        }, 1000);

        return () => clearTimeout(timer)
    })
    if (loading) return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
                <h4>Block #{blockNumber}</h4>
                Loading... <br/><Spinner animation="border" variant="primary" />
            </div>
      </div>
    )
//    <Link to={`/block/${blockContent.number+1}`}><Button variant="primary" size="sm" className="ml-2">Next</Button></Link>
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex ">
            <div className="px-5 py-3 container text-left">
                <h4>Block #{blockContent.number}</h4>
                <BlockInfo block={blockContent} />
            </div>
        </div>
    );
}
export default Block