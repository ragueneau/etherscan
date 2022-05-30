import React, { Component } from "react";
import { Button } from 'react-bootstrap'

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    search(term) {
        console.log(`Searching for ${term}`);

        //setState('');
        //redirect to block page

        //if the term is an integer, redirect to block page
        //if the term is a string, redirect to token page



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