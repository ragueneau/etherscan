import { useState, useEffect } from 'react'
import { ethers, utils } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
//import { HDWalletProvider } from '@truffle/hdwallet-provider';
// import truffle wallet 'truffle-hdwallet-provider'




//const provider = new HDWalletProvider(
 //   'engine amazing run phrase help age detect fan charge approve border salute',
//    'https://rinkeby.infura.io/v3/7b16e033fae342cd8afa67a9d340aaac'
//);

const Block = ({ match, networkName }) => {
    const [loading, setLoading] = useState(true)
    const [lastBlockNumber, setLastBlockNumber] = useState(0)
    const [blockContent, setBlockContent] = useState([{
        blockNumber: 1,
        blockHash: '',
        blockTransactions: [],
    }])
    console.log('Match:', match)

    //72533
    //const blockNumber = match.params.blockNumber || 14037513
    const blockNumber = 14037513


    //get last block number
    const getBlockNumber = async () => {
        //const HDWalletProvider = require('@truffle/hdwallet-provider');
        //const provider1 = new HDWalletProvider(
        //    'engine amazing run phrase help age detect fan charge approve border salute',
        //    'https://ethernode.coeptix.net'
        //);
        //const your_mnemonic_string = 'engine amazing run phrase help age detect fan charge approve border salute'
        //const your_selected_account = '0'
        //const account = utils.HDNode.fromMnemonic(your_mnemonic_string).derivePath(`m/44'/60'/0'/0/${your_selected_account}`);
        //console.log('account:', account)
        //const url = 'https://ethernode.coeptix.net'
        //const url = 'http://192.168.2.132:7545'

        //const provider = new ethers.providers.JsonRpcProvider(url);

        //const signer = new Wallet(account, provider);

        //const url = 'https://rinkeby.infura.io/v3/7b16e033fae342cd8afa67a9d340aaac'


        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const blockTransactions = await provider.getBlockWithTransactions(blockNumber)
        console.log('block number requested:', blockNumber)
        console.log('Block Transactions', blockTransactions)

        setBlockContent(blockTransactions)
        setLoading(false)
    }

    useEffect(() => {
        getBlockNumber()
        // convert unixtime to string
        //const unixtime = blockContent.timestamp.toString()
        //const date = new Date(unixtime * 1000)
        //const dateString = date.toLocaleString()
        //console.log('dateString', dateString)

    }, [])
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading block {blockNumber}...</h2>
      </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (

        <div className="flex justify-center">
            <div className="px-5 py-3 container text-center">
                <h3>Block #{blockContent.number}</h3>

                <Row className="justify-content-center">
                    <Col xs={1} md={8} lg={12}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <h3>Latest Blocks</h3>
                                </Card.Title>
                                <Card.Text>
                                    <div className="text-muted text-center">
                                        Block height: <i className="fas fa-user-circle">{blockContent.number}</i> <Link to={`/block/${blockContent.number-1}`}>
                                            <Button variant="primary" size="sm" className="ml-2">Previous</Button>
                                        </Link> <Link to={`/block/${blockContent.number+1}`}>
                                            <Button variant="primary" size="sm" className="ml-2">Next</Button>
                                        </Link>
                                    </div>
                                    <div className="text-muted text-center">
                                        Timestamp: <i className="fas fa-user-circle">{blockContent.timestamp}</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Transactions: <Link to={`/tx/${blockContent.number}`}><Button variant="secondary" size="sm" className="ml-2">{blockContent.transactions.length} transactions</Button></Link>
                                    </div>
                                    <div className="text-muted text-center">
                                        Burned Fees: <i className="fas fa-user-circle">0 xWei</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Difficulty: <i className="fas fa-user-circle">{blockContent.difficulty}</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Total Difficulty: <i className="fas fa-user-circle">{blockContent.number}</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Gas Used: <i className="fas fa-user-circle">{blockContent.gasUsed.toString()} xWei</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Gas Limit: <i className="fas fa-user-circle">{blockContent.gasLimit.toString()} xWei</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Nonce: <i className="fas fa-user-circle">{blockContent.nonce}</i>
                                    </div>
                                    <div className="text-muted text-center">
                                        Miner: <Link to={`/address/${blockContent.miner}`}><i className="fas fa-user-circle">{blockContent.miner}</i></Link>
                                    </div>
                                    <div className="text-muted text-center">
                                        Block hash: <Link to={`/block/${blockContent.hash}`}><i className="fas fa-user-circle">{blockContent.hash}</i></Link>
                                    </div>
                                    <div className="text-muted text-center">
                                        Parent Hash: <Link to={`/block/${blockContent.parentHash}`}><i className="fas fa-user-circle">{blockContent.parentHash}</i></Link>
                                    </div>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </div>
        </div>
    );
}
export default Block