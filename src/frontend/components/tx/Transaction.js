import { Row, Button, Col, ListGroup } from 'react-bootstrap'
import { Link,  } from "react-router-dom";

const Transaction = ({ transaction }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Row className="justify-content-center">
            <Col xs={1} md={1} lg={12}>

            <ListGroup variant="flush">
                <ListGroup.Item>
                <b>Transaction Hash</b>: {transaction.hash}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Status</b>:
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Block Number</b>: <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link> <Button variant="secondary" size="sm" className="ml-2">{transaction.confirmations} Block confirmations</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Timestamp</b>: {transaction.block.timediff} sec(s) ago {transaction.block.humandate}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>From</b>: <Link to={`/address/${transaction.from}`}>{transaction.from ? transaction.from : null}</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                <b>To</b>: <Link to={`/address/${transaction.to}`}>{transaction.to ? transaction.toRef : null}</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Value</b>: {transaction.value.toString() / 10 ** 18} xETH
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Transaction Fee</b>: {}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Gas Limit</b>: {}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Gas Used</b>: {}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Nonce</b>: {}
                </ListGroup.Item>

            </ListGroup>
            </Col>
        </Row>
    );
}
export default Transaction