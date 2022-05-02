import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const Tokens = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        //getTokenSupply()
        setLoading(false)
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h5>Tokens</h5>
        </main>
      )

      //setLoading(false)
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container">
                <h5>Tokens </h5>
                LePRJB <Link to={`/token/0xE57a2dDba8427e6b99dEE09F3EA125f19543c535`}>0xE57a2dDba8427e6b99dEE09F3EA125f19543c535</Link>
            </div>
        </div>
    );
}
export default Tokens