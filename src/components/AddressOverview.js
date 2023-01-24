import { Card,ListGroup } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const AddressOverview = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>Overview</b></Card.Title>
            </Card.Header>
            <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Balance</b>: {address.balance} eth</ListGroup.Item>
                        <ListGroup.Item><b>eth Value</b>: ${address.value}</ListGroup.Item>
                        <ListGroup.Item><b>Tokens</b>: </ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
}
export default AddressOverview;