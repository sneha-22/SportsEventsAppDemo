import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const mockEvents = [
  { id: 1, event_name: 'Event 1', start_time: '2024-09-29T10:00:00', end_time: '2024-09-29T12:00:00' },
  { id: 2, event_name: 'Event 2', start_time: '2024-09-30T14:00:00', end_time: '2024-09-30T16:00:00' },
  { id: 3, event_name: 'Event 3', start_time: '2024-10-01T10:00:00', end_time: '2024-10-01T12:00:00' },
  { id: 4, event_name: 'Event 4', start_time: '2024-10-02T14:00:00', end_time: '2024-10-02T16:00:00' }
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockEvents),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  
  test('displays loading spinner while fetching events', async () => {
    render(<App />);
    expect(screen.getByText(/Loading events.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading events.../i)).not.toBeInTheDocument());
  });

  test('renders events after fetch', async () => {
    render(<App />);
    await waitFor(() => {
      mockEvents.forEach(event => {
        expect(screen.getByText(event.event_name)).toBeInTheDocument();
      });
    });
  });

  test('allows selecting an event', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockEvents[0].event_name)).toBeInTheDocument());
    
    const selectButton = screen.getAllByText(/Select/i)[0];
    expect(selectButton).toBeInTheDocument()
    fireEvent.click(selectButton);
    
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
 
  // Test for error handling during fetch
  test('handles error state when fetching events fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    render(<App />);

    expect(screen.getByText(/Loading events.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading events.../i)).not.toBeInTheDocument());
  });
});
