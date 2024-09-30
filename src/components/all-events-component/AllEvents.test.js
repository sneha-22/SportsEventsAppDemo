import React from 'react';
import { render, screen } from '@testing-library/react';
import AllEvents from './AllEvents';
import EventCard from '../event-card-component/EventCard';
import '@testing-library/jest-dom'; // Import jest-dom matchers


// Mock EventCard component
jest.mock('../event-card-component/EventCard', () => {
    return jest.fn(() => <div>Mock EventCard</div>);
});

describe('AllEvents Component', () => {
    const mockEvents = [
        { id: 1, event_name: 'Event 1', event_category: 'Sports' },
    ];
    const mockOnSelectEvent = jest.fn();
    const mockSelectedEvents = [
        { id: 2, event_name: 'Event 2', event_category: 'Sports' },
        {}
    ];

    beforeEach(() => {
        // Clear the mock before each test
        EventCard.mockClear();

    });

    test('renders the title', () => {
        render(<AllEvents events={mockEvents} onSelectEvent={mockOnSelectEvent} selectedEvents={mockSelectedEvents} />);
        expect(screen.getByText(/All Events/i)).toBeInTheDocument();
    });

    test('renders the correct number of EventCard components', () => {
        render(<AllEvents events={mockEvents} onSelectEvent={mockOnSelectEvent} selectedEvents={mockSelectedEvents}/>);
        expect(EventCard).toHaveBeenCalledTimes(mockEvents.length);
    });

    test('passes correct props to EventCard', () => {
        render(<AllEvents events={mockEvents} selectedEvents={mockSelectedEvents} onSelectEvent={mockOnSelectEvent} isSelected={false} />);
        mockEvents.forEach((event) => {
            expect(EventCard).toHaveBeenCalledWith(
                {
                    event: event,
                    onSelectEvent: mockOnSelectEvent,
                    isSelected: false
                },
                {}
            )

        });
    });

    test('does not render EventCard if no events are provided', () => {
        render(<AllEvents events={[]} onSelectEvent={mockOnSelectEvent} selectedEvents={mockSelectedEvents} />);
        expect(EventCard).not.toHaveBeenCalled();
    });

    test('should render filter dropdown', () => {
        render(<AllEvents events={mockEvents} onSelectEvent={mockOnSelectEvent} selectedEvents={[]}/>)
        expect(screen.getByText(/Filter :/i));
    });

    test('should render sort by dropdown', () => {
        render(<AllEvents events={mockEvents} onSelectEvent={mockOnSelectEvent} selectedEvents={[]}/>)
        expect(screen.getByText(/Sort by :/i));
    });
});
