import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { useParams } from "react-router-dom";
import Transaction from './tx/Transaction'

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
        const provider = new ethers.providers.Web3Provider(window.ethereum)

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
                <Transaction transaction={transaction} />
            </div>
        </div>
    );
}
export default Tx