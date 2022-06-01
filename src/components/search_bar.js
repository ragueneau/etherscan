import React, { Component } from "react";
import { Button } from 'react-bootstrap'

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    isAddress(address) {
        return /^(0x)?[0-9a-f]{40}$/i.test(address);
    }
    isTx(address) {
        return /^(0x)?[0-9a-f]{64}$/i.test(address);
    }

    search(term) {

        //if the term is an integer, load the block page
        if (term.match(/^[0-9]+$/)) {
            console.log(`Searching for block: ${term}`);
            //this.props.history.push(`/block/${term}`);

        } else if (this.isAddress(term)) {
            console.log(`Searching for address: ${term}`);
            //this.props.history.push(`/address/${term}`);

        } else if (this.isTx(term)) {
            console.log(`Searching for tx: ${term}`);
            //this.props.history.push(`/tx/${term}`);

        //else if ens name
        } else if (term.match(/^[a-z0-9]+\.[a-z0-9]+$/i)) {
            console.log(`Searching for ens name: ${term}`);
            //this.props.history.push(`/ens/${term}`);

        //else if token name
        } else if (term.match(/^[a-z0-9]+$/i)) {
            console.log(`Searching for token: ${term}`);
            //this.props.history.push(`/token/${term}`);

        } else {
            console.log(`Not in bd: ${term}`);
            //this.props.history.push(`/transaction/${term}`);
        }

    }

    onInputChange(term) {
        this.setState({ term });
        //this.props.onSearchTermChange(term);

    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)}
                    onSubmit={event => this.search(this.state.term)}
                /> <Button variant="outline-info" onClick={() => this.search(this.state.term )}>Search</Button>
            </div>
       );
    }

};

export default SearchBar;