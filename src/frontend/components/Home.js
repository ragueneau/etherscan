
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Home = ({ networkName }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [lastBlockNumber, setLastBlockNumber] = useState()
    const [items, setItems] = useState([])

    //const [account, setAccount] = useState([])

    //get last block number
    const getLastBlockNumber = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const blockNumber = await provider.getBlockNumber()
        console.log('Last block number:', blockNumber)

        let items = []

        //a for loop to get the last 10 blocks
        for (let i = 0; i < 10; i++) {
            const block = await provider.getBlock(blockNumber - i)
            //console.log('Block:', block)

            items.push(block)
        }

        setItems(items)
        setLastBlockNumber(blockNumber)

        setLoading(false)
    }

    useEffect(() => {
      getLastBlockNumber()

      let timer = setTimeout(() => {
        setCount((count) => count + 1);
      }, 10000);

      return () => clearTimeout(timer)
      })
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
                <h2>Loading the latest blocks...</h2>
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
          <div className="px-5 py-3 container">
            <h2>EVM Blockchain Scanner</h2>
            <Row className="justify-content-center">


                <Col xs={1} md={4} lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>
                              <h3>Latest Blocks</h3>
                            </Card.Title>
                            <Card.Text>
                                <ul>
                                {items.map((item, idx) => (
                                  <li key={idx} className="list-group-item">
                                    <Link to={`/block/${item.number}`}>{item.number}</Link> Hash: <Link to={`/block/${item.number}`}>{item.hash.slice(0, 15) + '...'}</Link><br/>
                                    {item.transactions.length} transaction(s)
                                  </li>
                                ))}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={1} md={4} lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>
                              <h3>Latest Transactions</h3>
                            </Card.Title>
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
export default Home