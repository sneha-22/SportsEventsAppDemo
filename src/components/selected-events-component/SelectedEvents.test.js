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
    const mockEvents = [
        { id: 2, event_name: 'Event 2', event_category: 'Sports' },
    ];
    const mockSelectedEvents = [
        { id: 1, event_name: 'Event 2', event_category: 'Sports' },

    ];

    const mockOnDeselectEvent = jest.fn();


    beforeEach(() => {
        // Clear the mock before each test
        EventCard.mockClear();

    });

    test('renders the title', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/Selected Events/i)).toBeInTheDocument();
    });

    test('renders the number of selected events', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/1/i)).toBeInTheDocument();
    });


    test('renders the correct number of EventCard components', () => {
        render(<SelectedEvents events={mockSelectedEvents} onDeselectEvent={mockOnDeselectEvent} />);
        expect(EventCard).toHaveBeenCalledTimes(mockSelectedEvents.length);
    });

    test('passes correct props to EventCard', () => {
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

    test('does not render EventCard if no events are selected', () => {
        render(<SelectedEvents events={[]} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(EventCard).not.toHaveBeenCalled();
    });

    test('should render message if no events are selected', () => {
        render(<SelectedEvents events={[]} onDeselectEvent={mockOnDeselectEvent}/>);
        expect(screen.getByText(/No events selected./i)).toBeInTheDocument();
    });
});
