import { Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import {  Link } from "react-router-dom";

const ContractMoreinfo = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header><Card.Title><b>Contract Info</b></Card.Title></Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item><b>Name Tag</b>: </ListGroup.Item>
                    <ListGroup.Item><b>Creator</b>: </ListGroup.Item>
                    <ListGroup.Item><b>Tracker</b>: </ListGroup.Item>
                    <ListGroup.Item><Link to={`/logs/${address.address}`}>View Contract Events</Link> - <Link to={`/interface/${address.address}`}>Contract interface</Link></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
}
export default ContractMoreinfo;