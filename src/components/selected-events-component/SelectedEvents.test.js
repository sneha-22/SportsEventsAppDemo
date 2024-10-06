import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectedEvents from './SelectedEvents';
import EventCard from '../event-card-component/EventCard';
import '@testing-library/jest-dom'; // Import jest-dom matchers

// Mock EventCard component
jest.mock('../event-card-component/EventCard', () => {
    return jest.fn(() => <div>Mock EventCard</div>);
});

describe('SelectedEvents Component', () => {

    const mockSelectedEvents = [
        { id: 1, event_name: 'Event 2', event_category: 'Sports' },
    ];

    const mockOnDeselectEvent = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the title', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/Selected Events/i)).toBeInTheDocument();
    });

    it('should render the number of selected events', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/1/i)).toBeInTheDocument();
    });


    it('should render the correct number of EventCard components', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent} />);
        expect(EventCard).toHaveBeenCalledTimes(mockSelectedEvents.length);
    });

    it('should pass correct props to EventCard', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent}/>);
        mockSelectedEvents.forEach((event) => {
            expect(EventCard).toHaveBeenCalledWith(
                {
                    event: event,
                    onDeselectEvent: mockOnDeselectEvent,
                    isSelectedView: true,
                    isSelected: false
                },
                {}
            )

        });
    });

    it('should not render EventCard if no events are selected', () => {
        render(<SelectedEvents events={[]} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(EventCard).not.toHaveBeenCalled();
    });

    it('should render message if no events are selected', () => {
        render(<SelectedEvents events={[]} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/No events selected./i)).toBeInTheDocument();
    });
});
