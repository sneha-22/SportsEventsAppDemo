import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EventCard from './EventCard';
import '@testing-library/jest-dom'; // Import jest-dom matchers

describe('EventCard Component', () => {
  const mockEvent = {
    event_name: 'Sample Event',
    event_category: 'Sports',
    start_time: '2024-01-01 10:00:00',
    end_time: '2024-01-01 12:00:00',
  };
  
  const mockonSelect = jest.fn();
  const mockonDeselect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });


  test('should render event card with details', () => {
    render(<EventCard event={mockEvent}/>);
    
    expect(screen.getByText(/Sample Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Category: Sports/i)).toBeInTheDocument();
    expect(screen.getByText(/Jan 1, 2024/i)).toBeInTheDocument();
  });

  test('should call onSelectEvent when "Select" button is clicked', () => {
    render(<EventCard event={mockEvent} onSelectEvent={mockonSelect} isSelected={false} isSelectedView={false}/>);

    const selectBtn = screen.getByRole('button', {name: /Select/i});
    fireEvent.click(selectBtn);
    expect(mockonSelect).toHaveBeenCalledWith(mockEvent);
  });

  test('should call onDeselectEvent when "Remove" button is clicked', () => {
    render(<EventCard event={mockEvent} onDeselectEvent={mockonDeselect} isSelected={true} isSelectedView={true}/>);
    
    const selectBtn = screen.getByRole('button', {name: /Remove/i});
    fireEvent.click(selectBtn);
    expect(mockonDeselect).toHaveBeenCalledWith(mockEvent);
  });

  
  test('should disable Select btn when card is already selected', () => {
    render(<EventCard event={mockEvent} onDeselectEvent={mockonSelect} isSelected={true} isSelectedView={false}/>);
    
    const selectBtn = screen.getByRole('button', {name: /Select/i});
    expect(selectBtn).toBeDisabled();
  });
});
