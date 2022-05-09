import { Card } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const ContractOverview = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Contract Overview</Card.Title>
                <Card.Text>
                    <ul>
                        <li className="list-group-item"><b>Balance</b>: {address.balance} eth</li>
                        <li className="list-group-item"><b>eth Value</b>: ${address.value}</li>
                        <li className="list-group-item"><b>Tokens</b>: </li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
        );
}
export default ContractOverview;