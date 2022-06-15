import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";

const ContractMoreinfo = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Contract Info</Card.Title>
                <Card.Text>
                <ul>
                    <li className="list-group-item"><b>Name Tag</b>: </li>
                    <li className="list-group-item"><b>Creator</b>: </li>
                    <li className="list-group-item"><b>Tracker</b>: </li>
                    <li className="list-group-item"><Link to={`/logs/${address.address}`}>View Contract Events</Link> - <Link to={`/contractsim/${address.address}`}>Contract interface</Link></li>
                </ul>
                </Card.Text>
            </Card.Body>
        </Card>
      );
}
export default ContractMoreinfo;