import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const Tokens = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)

    const getTokenList = async () => {
        //const provider = new ethers.providers.Web3Provider(window.ethereum)
        //const tokenList = await provider.getTokenList()
        //console.log('Token list:', tokenList)
        setLoading(false)
    }

    useEffect(() => {
        getTokenList()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Tokens</h5>
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Tokens </h5>
                <Row className="justify-content-center">
                    <Col md={6} lg={12}>
                        <Card>
                            <Card.Body>
                                  A token list
                                  <li className="list-group-item"><b>LePRJB</b>: <Link to={`/token/0xE57a2dDba8427e6b99dEE09F3EA125f19543c535`}>0xE57a2dDba8427e6b99dEE09F3EA125f19543c535</Link></li>
                                  <li className="list-group-item"><b>1inch</b>: <Link to={`/token/0xC2B476f730256b145cA3956478f315f7Bf4d3Cd4`}>0xC2B476f730256b145cA3956478f315f7Bf4d3Cd4</Link></li>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </div>
        </div>
    );
}
export default Tokens