import React from 'react'

const CategoryFilter = ({filters, filterCategory, onFilterChange }) => {
    return (
        <>
            <label className='filter'>
                <span>Filter :{' '}</span>
                <select value={filterCategory} onChange={(e) => onFilterChange(e.target.value)}>
                    <option value=''>All</option>
                    {
                        filters.map((filter, index) => (
                            <option key={index} value={filter}>{filter}</option>
                        ))
                    }
                </select>
            </label>
        </>
    )
}

export default CategoryFilter;