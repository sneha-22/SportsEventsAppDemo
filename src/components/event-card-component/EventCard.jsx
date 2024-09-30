import React from 'react';

const EventCard = ({ event, onSelectEvent, onDeselectEvent, isSelectedView, isSelected }) => {

  const formatEventTiming = (startTime, endTime) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Format date
    const formattedDate = startDate.toLocaleDateString('en-US', options);

    // Format time
    const startTimeFormatted = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTimeFormatted = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return `${formattedDate} (${startTimeFormatted} - ${endTimeFormatted})`;
  };

  return (
    <div className={`event-card ${!isSelectedView ? isSelected ? "selected" : "" : ""}`}>
      <h3>{event.event_name}</h3>
      <p>Category: {event.event_category}</p>
      <p>Date: {formatEventTiming(event.start_time, event.end_time).substring(0,12)}</p>
      <p>Timing: {formatEventTiming(event.start_time, event.end_time).substring(12)}</p>
      <div className={isSelected ? 'btn-container-selected' : 'btn-container'}>
        <button onClick={() => isSelectedView ? onDeselectEvent(event) : onSelectEvent(event)} disabled={!isSelectedView ? isSelected : false}>
          {isSelectedView ? 'Remove' : 'Select'}
        </button>
      </div>

    </div>
  )
}

export default EventCard