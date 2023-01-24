import { Card, ListGroup } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const ContractOverview = ({ address }) => {
    const tokens = []
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>Contract Overview</b></Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item><b>Balance</b>: {address.balance} eth</ListGroup.Item>
                    <ListGroup.Item><b>eth Value</b>: ${address.value}</ListGroup.Item>
                    <ListGroup.Item><b>Tokens</b>: </ListGroup.Item>
                    <ListGroup.Item>{tokens.map((token, i) => {
                        return <div key={i}>{token.symbol} {token.balance}</div>
                    }
                    )}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
}
export default ContractOverview;