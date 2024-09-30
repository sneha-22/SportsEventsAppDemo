import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import AllEvents from './components/all-events-component/AllEvents';
import SelectedEvents from './components/selected-events-component/SelectedEvents';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {

  // Load saved events from localStorage on initial render
  const localSavedEvents = () => {
    const savedEvents = localStorage.getItem("selectedEvents");
    return savedEvents ? JSON.parse(savedEvents) : []
  }

  const API_URL = 'https://run.mocky.io/v3/d1b4d3f6-d64d-467f-a85d-a17679dcd65f';
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(localSavedEvents());


  //Store selected events in local storage, whenever changing
  useEffect(() => {
    localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  useEffect(() => {
    setLoading(true); // Set loading to true before API call
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [])

  const hasClashingEvents = useMemo(() => {
    return (newEvent) => {
      return selectedEvents.some(e => {
        const newEventStart = new Date(newEvent.start_time);
        const newEventEnd = new Date(newEvent.end_time);     // Parsing date strings to Date objects

        const eventStart = new Date(e.start_time);
        const eventEnd = new Date(e.end_time);

        // Check if the new event overlaps with any existing event
        return (newEventStart < eventEnd && newEventEnd > eventStart)

      });
    }

  }, [selectedEvents])

  const handleSelectEvent = (_event) => {
    if (selectedEvents.length >= 3) {
      alert('You have reached maximum number of events.');
      return;
    }
    if (hasClashingEvents(_event)) {
      alert('You already have an event in this slot.');
      return;
    }
    setSelectedEvents([...selectedEvents, _event])
  }

  const handleDeselectEvent = (_event) => {
    const updatedSelectedEvents = selectedEvents.filter(e => e.id !== _event.id);
    setSelectedEvents(updatedSelectedEvents);
  }

  return (
    <>
      <div className='app-title'>
        <h1>Sports Events Registration</h1>
      </div>
      <div className="app-container">
        <div className="box events-container">
          {
            loading ? (
              <div className="spinner-container">
                <ClipLoader color="#09f" loading={loading} size={50} />
                <span>Loading events...</span>
              </div>
            ) : 
              <AllEvents events={allEvents} onSelectEvent={handleSelectEvent} selectedEvents={selectedEvents} />
          }
        </div>
        <div className="box selected-events-container">
          <SelectedEvents events={selectedEvents} onDeselectEvent={handleDeselectEvent} />
        </div>
      </div>
    </>

  );
}

export default App;
