import React from 'react'
import EventCard from '../event-card-component/EventCard';

const SelectedEvents = ({ events, onDeselectEvent }) => {
    return (

        <>
            <div>
                <div>

                    <h2>
                        <span>Selected Events </span>
                        <span>({events.length})</span>
                    </h2>
                </div>
                {events.length === 0 ? (
                    <p>No events selected.</p>
                ) : (
                        events.map((event) => (
                            <EventCard key={event.id} event={event} isSelectedView={true} onDeselectEvent={onDeselectEvent} isSelected={false} />
                        )))
                }
            </div>

        </>
    );

}

export default SelectedEvents;