import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const SearchBar = () => {
    const [term, setTerm] = useState('')

    function isAddress(address) {
        return /^(0x)?[0-9a-f]{40}$/i.test(address);
    }
    function isTx(address) {
        return /^(0x)?[0-9a-f]{64}$/i.test(address);
    }

    function search(term) {

        //if the term is an integer, load the block page
        if (term.match(/^[0-9]+$/)) {
            console.log(`Searching for block: ${term}`);
            window.location.href = `/block/${term}`;

        } else if (isAddress(term)) {
            console.log(`Searching for address: ${term}`);
            window.location.href = `/address/${term}`;

        } else if (isTx(term)) {
            console.log(`Searching for tx: ${term}`);
            window.location.href = `/tx/${term}`;

        //else if ens name
        } else if (term.match(/^[a-z0-9]+\.[a-z0-9]+$/i)) {
            console.log(`Searching for ens name: ${term}`);
            window.location.href = `/ens/${term}`;

        //else if token name
        } else if (term.match(/^[a-z0-9]+$/i)) {
            console.log(`Searching for token: ${term}`);
            window.location.href = `/token/${term}`;

        } else {
            console.log(`Not in bd: ${term}`);
        }

    }

    function onInputChange(term) {
        //console.log(term)
        setTerm( term ) ;
    }

    return (
        <div className="search-bar" style={{
            marginTop: '0.9rem',
            marginBottom: '0.9rem'
        }}>
            <input
                value={term}
                onChange={event => onInputChange(event.target.value)}
                placeholder="Search for a transaction, block, address, token, or ens name"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        search(term)
                    }
                }}
                style={{
                    width: '540px',
                    borderRadius: '0',
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                    padding: '0.5rem',
                    fontSize: '0.9rem'
                }}
            /> <Button className="color2" onClick={() => search(term)}><FontAwesomeIcon icon={faSearch} /></Button>
        </div>
    );
}
export default SearchBar;
