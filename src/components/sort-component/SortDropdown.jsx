import React from 'react'

const SortDropdown = ({sortKey, onSortKeyChange}) => {
    return (
        <>
            <label className='sort-by'>
                <span>Sort by :{' '}</span>
                <select value={sortKey} onChange={e => onSortKeyChange(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                </select>
            </label>
        </>
    )
}

export default SortDropdown;