import { Event } from '@ethersproject/providers/lib/base-provider';
import { Card, Table, Col, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";

const ContractEvents = ({ events }) => {
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card className="event-table">
            <Card.Header>
                <Card.Title className="Title">Contract Events</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive size="sm" className="table-sm table-responsive" >
                    <thead>
                        <tr>
                            <th>Block</th>
                            <th>Tx</th>
                            <th>Idx</th>
                            <th>Event</th>
                            <th>Transaction Hash</th>
                            <th>Transaction Arguments</th>
                        </tr>
                    </thead>
                    <tbody>
                {events ? events.map((event, idx) => (
                <tr key={idx}>
                    <td><Link to={`/block/${event.blockNumber}`}>{event.blockNumber}</Link></td>
                    <td><Link to={`/tx/${event.transactionHash}`}>{event.transactionIndex}</Link></td>
                    <td>{event.logIndex}</td>
                    <td>{event.event}</td>
                    <td>
                        <Row className="no-gutters infobox">
                            <Col classMap="text-truncate">
                                <Link title={event.transactionHash} to={`/tx/${event.transactionHash}`}>{event.transactionHash.slice(0,15)+'...'+event.transactionHash.slice(49,64)}</Link>
                            </Col>
                        </Row>
                    </td>
                    <td>
                        <table>
                            <tbody>
                                {event.args.map((arg, idx) => (
                                <tr key={idx} className="no-gutters infobox">
                                    <td className="infobox" style={{width: "100%"}}>
                                        {Object.keys(event.args)[idx+event.args.length]}:
                                    </td>
                                    <td  className="infobox">
                                        {event.args[idx].toString()}
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                        </table>
                    </td>
                </tr>
                )): null}
                    </tbody>
                </Table>

            </Card.Body>
        </Card>
    );
}
export default ContractEvents;