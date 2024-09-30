import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const mockEvents = [
  { id: 1, name: 'Event 1', start_time: '2024-09-29T10:00:00', end_time: '2024-09-29T12:00:00' },
  { id: 2, name: 'Event 2', start_time: '2024-09-30T14:00:00', end_time: '2024-09-30T16:00:00' },
  { id: 3, name: 'Event 3', start_time: '2024-10-01T10:00:00', end_time: '2024-10-01T12:00:00' },
  { id: 4, name: 'Event 4', start_time: '2024-10-02T14:00:00', end_time: '2024-10-02T16:00:00' }
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
        expect(screen.getByText(event.name)).toBeInTheDocument();
      });
    });
  });

  test('allows selecting an event', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument());
    
    const selectButton = screen.getAllByText(/Select/i)[0];
    fireEvent.click(selectButton);
    
    expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument();
  });

  test('allows deselecting an event', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument());

    const selectButton = screen.getAllByText(/Select/i)[0];
    fireEvent.click(selectButton);

    const deselectButton = screen.getByText(/Deselect/i);
    fireEvent.click(deselectButton);

    expect(screen.queryByText(mockEvents[0].name)).not.toBeInTheDocument();
  });

  test('does not allow selecting more than three events', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument());

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    const selectButtons = screen.getAllByText(/Select/i);
    fireEvent.click(selectButtons[0]);
    fireEvent.click(selectButtons[1]);
    fireEvent.click(selectButtons[2]);
    
    fireEvent.click(selectButtons[3]); // Attempt to select a fourth event

    expect(window.alert).toHaveBeenCalledWith('You have reached maximum number of events.');
  });

  test('does not allow selecting clashing events', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument());

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Select the first event
    const selectButton1 = screen.getAllByText(/Select/i)[0];
    fireEvent.click(selectButton1);

    // Attempt to select an event that clashes (assume mockEvents[1] clashes)
    const selectButton2 = screen.getAllByText(/Select/i)[1]; 
    fireEvent.click(selectButton2);

    expect(window.alert).toHaveBeenCalledWith('You already have an event in this slot.');
  });

  // Test for error handling during fetch
  test('handles error state when fetching events fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    render(<App />);

    expect(screen.getByText(/Loading events.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading events.../i)).not.toBeInTheDocument());
    
    // You could also check for an error message here
    // expect(screen.getByText(/Error fetching events/i)).toBeInTheDocument();
  });
});
