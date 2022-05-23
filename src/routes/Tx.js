import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ethers } from "ethers"
import { useParams } from "react-router-dom";

import Transaction from '../components/Transaction'

const Tx = ({ networkName, transactionHash }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [transaction, setTransaction] = useState(
        {
            transactionHash: params.transactionHash,
            blockNumber: 0,
            blockHash: '',
            from: '',
            to: '',
            value: 0,
            gas: 0,
            gasPrice: 0,
            gasUsed: 0,
            input: '',
            block: {
                timediff: 0
            }
        }
    )

    const getTransaction = async () => {
        const provider = new ethers.providers.JsonRpcProvider(Config.node)

        const tx = await provider.getTransaction(params.transactionHash)

        tx.block = await provider.getBlock(tx.blockNumber)
        tx.block.timediff = Math.round(+new Date()/1000) - tx.block.timestamp

        const date = new Date(tx.block.timestamp * 1000)
        tx.block.humandate = date.toString()

        setTransaction(tx)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getTransaction()
            setLoading(false)
        }, 900);
        return () => clearTimeout(timer)
      })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading transaction...</h2>
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Transaction Details</h5>
                <Row className="justify-content-center">
                    <Col xs={1} md={1} lg={12}>
                        <Transaction transaction={transaction} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Tx