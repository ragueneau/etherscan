import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
//import { Link } from "react-router-dom";

const Txs = ({ networkName, blockNumber }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    //const [lastBlockNumber, setLastBlockNumber] = useState(0)
    const [blockContent, setBlockContent] = useState([{
        blockNumber: 1,
        blockHash: '',
        blockTransactions: [],
    }])

    //get params from url
    console.log('TXs BlockNumber:', params)

    //72533
    //const blockNumber = match.params.blockNumber || 14037513
    //const blockNumber = 14037513
    // blockNumber = 72533

    //get last block number
    const getBlockNumber = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const blockTransactions = await provider.getBlockWithTransactions(blockNumber)
        console.log('block number requested:', blockNumber)
        console.log('Block Transactions', blockTransactions)

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        getBlockNumber()

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading block #{blockContent.number}...</h2>
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Transactions {blockContent.number}</h5>

                <Row className="justify-content-center">

                    <Col xs={1} md={10} lg={12}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Latest Transactions</Card.Title>
                                <Card.Text>
                                    <span className="text-muted">
                                        <i className="fas fa-user-circle">Text</i>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Txs