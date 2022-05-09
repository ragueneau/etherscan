import { Card } from 'react-bootstrap'
//import { Link } from "react-router-dom";

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
                </ul>
                </Card.Text>
            </Card.Body>
        </Card>
      );
}
export default ContractMoreinfo;