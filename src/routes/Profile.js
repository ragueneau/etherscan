import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom";

const Profile = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)

    //get last block number
    const getProfile = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        setLoading(false)
    }

    useEffect(() => {
        getProfile()

        let timer = setTimeout(() => {

        }, 1000);

        return () => clearTimeout(timer)
    })
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading profile</h2>
        <Spinner animation="border" style={{ display: 'flex' }} />
      </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <div className="flex justify-center">
            <div className="px-5 py-3 container text-center">
                <h5>Profile</h5>
            </div>
        </div>
    );
}
export default Profile