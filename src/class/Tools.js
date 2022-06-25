import { Button, Row, Col, Card, Spinner, ListGroup, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";

export let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

// ---------------------------------------------------------------------------------------------------------------------------- //
function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export function getAddress(address) {
    //const addr = address.slice(0,6) + '...' + address.slice(-4)

    return <div className="address">
        <span className="text-truncate">{address}</span> <Button variant="link" className="copy-button" onClick={() => copyToClipboard(address)}>{copyIcon}</Button>
    </div>
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export function linkAddress(address) {
    const addr = address.slice(0,7) + '...' + address.slice(-5)

    return <span>
        <Link title={address} to={`/address/${address}`}>{addr}</Link><Button variant="link" size="sm" className="copy-button table-button" onClick={() => copyToClipboard(address)}>{copyIcon}</Button>
    </span>
}

    //a fonction to timestamp to date
export function unixToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
}