import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const Address = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [lastBlockNumber, setLastBlockNumber] = useState(0)

    //const [account, setAccount] = useState([])
    console.log('Params:', params)

    //get last block number
    const getAddress = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const address = await provider.getBalance(params.walletAddress)
        console.log('Address:', address)
        //const blockNumber = await provider.getBlockNumber()
        //console.log('Last block number:', blockNumber)

        //setLastBlockNumber(blockNumber)
        // get transactions
        const transactions = await provider.getTransactionCount(params.walletAddress)
        console.log('Transactions:', transactions)

        //verify erc20 token Balance
        //const erc20 = new ethers.Contract(params.erc20Address, params.erc20ABI, provider)
        //const erc20Balance = await erc20.balanceOf(params.walletAddress)
        //console.log('ERC20 Balance:', erc20Balance)



        setLoading(false)
    }

    useEffect(() => {
        getAddress()

      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h4>Loading address: {params.walletAddress}</h4>
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h4>Address: {params.walletAddress}</h4>

                <Row className="justify-content-center">
                    <Col xs={1} md={10} lg={12}>
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
export default Address