import React from 'react'

const SearchBar = ({ searchQuery, onSearchQueryChange }) => {
    console.log('here')
    return (
        <>
            <span style={{paddingLeft:'20px'}}>
                <label>Search for events :</label>
                <span style={{paddingLeft:'10px'}}>
                <input type='text' value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} placeholder='Search Events ...' />

                </span>

            </span>
        </>

    )
}

export default SearchBar