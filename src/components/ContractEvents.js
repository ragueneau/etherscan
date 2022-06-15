import { Card, Table } from 'react-bootstrap'
import { Link } from "react-router-dom";

const ContractEvents = ({ events }) => {
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card className="event-table">
            <Card.Header>
                <Card.Title>Contract Events</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover size="sm" className="table-sm table-responsive" >
                    <thead>
                        <tr>
                            <th>Block</th>
                            <th>Tx</th>
                            <th>Idx</th>
                            <th>Event</th>
                            <th>Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                {events ? events.map((event, idx) => (
                <tr key={idx}>
                    <td><Link to={`/block/${event.blockNumber}`}>{event.blockNumber}</Link></td>
                    <td><Link to={`/tx/${event.transactionHash}`}>{event.transactionIndex}</Link></td>
                    <td>{event.logIndex}</td>
                    <td>{event.event}</td>
                    <td><Link to={`/tx/${event.transactionHash}`}>{event.transactionHash}</Link></td>
                </tr>
                )): null}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}
export default ContractEvents;