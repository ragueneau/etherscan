import { Card } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const AddressMoreinfo = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>More Info</Card.Title>
                <Card.Text>
                <ul>
                    <li className="list-group-item"></li>
                    <li className="list-group-item"></li>
                    <li className="list-group-item"></li>
                </ul>
                </Card.Text>
            </Card.Body>
        </Card>
      );
}
export default AddressMoreinfo;