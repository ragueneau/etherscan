import { Event } from '@ethersproject/providers/lib/base-provider';
import { Card, Table, Col, Row } from 'react-bootstrap'
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
                    <td>
                        <Row className="no-gutters text-truncate infobox">
                            <Col>
                            <Link to={`/tx/${event.transactionHash}`}>{event.transactionHash}</Link>
                            </Col>
                            <Col>

                            {event.args.map((arg, idx) => (
                                <Row key={idx} className="no-gutters infobox">
                                    <Col  md={3} className="text-truncate infobox">
                                        {Object.keys(event.args)[idx+event.args.length]}:
                                    </Col>
                                    <Col  md={8} className="text-truncate infobox">
                                         {event.args[idx].toString()}
                                    </Col>
                                </Row>
                            ))}
                            </Col>
                        </Row>
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