import React, { useMemo, useState, useEffect } from 'react';
import EventCard from '../event-card-component/EventCard';
import uniq from 'lodash/uniq';
import CategoryFilter from '../category-filter-component/CategoryFilter';
import SortDropdown from '../sort-component/SortDropdown';
import SearchBar from '../search-bar-component/SearchBar';

const AllEvents = ({ events, onSelectEvent, selectedEvents }) => {

    //Getting value of filterCategory from local storage on component render
    const localFilter = () => {
        const savedFilterCategory = localStorage.getItem("filterCategory");
        return savedFilterCategory || '';
    }

    //Getting value of sortKey from localStorage on component render
    const localSortKey = () => {
        const savedSortKey = localStorage.getItem("sortKey");
        return savedSortKey || 'date';
    }

    //Getting value of searchQuery from localStorage on component render
    const localSearchQuery = () => {
        const savedSearchQuery = localStorage.getItem("searchQuery");
        return savedSearchQuery || '';
    }

    const [filterCategory, setFilterCategory] = useState(localFilter());
    const [sortKey, setSortKey] = useState(localSortKey());
    const [searchQuery, setSearchQuery] = useState(localSearchQuery());
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    const filters = uniq(events.map(e => e.event_category));

    //debouncing search query input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300); //300 ms delay
        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery]);

    //Setting value of filter category and sort key to local storage, whenever changing
    useEffect(() => {
        localStorage.setItem("filterCategory", filterCategory);
        localStorage.setItem("sortKey", sortKey);
        localStorage.setItem("searchQuery", searchQuery);
    }, [filterCategory, sortKey, searchQuery]);

    //Syntax for useMemo : useMemo(() => calculatedResult, [...dependencies])
    const filteredEvents = useMemo(() => {
        return events.filter((e) => {
            const matchedFilter = filterCategory === '' || e.event_category === filterCategory;
            const matchedSearchQuery = e.event_name.toLowerCase().includes(searchQuery.toLowerCase());            return matchedFilter && matchedSearchQuery;
        });
    }, [filterCategory, events, debouncedSearchQuery])

    const sortedEvents = filteredEvents.sort((a, b) => {
        switch (sortKey) {
            case 'name':
                return a.event_name.localeCompare(b.event_name);

            case 'date':
                return new Date(a.start_time) - new Date(b.start_time);

        }
    })

    return (
        <>
            <div>
                <div>
                    <h2>All Events</h2>
                </div>

                {/* Filter and Sorting dropdowns */}
                <div style={{ paddingBottom: '20px' }}>
                    <CategoryFilter filters={filters} filterCategory={filterCategory} onFilterChange={setFilterCategory} />
                    <SortDropdown sortKey={sortKey} onSortKeyChange={setSortKey} />
                    <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery}/>
                </div>
                <div className="events-list">
                    {
                        sortedEvents.length === 0 ?
                            <p>No events available.</p> :
                            (
                                sortedEvents.map((event) => (
                                    <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent}
                                        isSelected={!!selectedEvents.find(e => e.id === event.id)} />
                                ))
                            )
                    }

                </div>
            </div>

        </>
    );
};

export default AllEvents;