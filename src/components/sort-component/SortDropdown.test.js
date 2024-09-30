import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SortDropdown from './SortDropdown';
import '@testing-library/jest-dom'; // Import jest-dom matchers

describe.only('SortDropdown Component', () => {
    const mockOnSortKeyChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock function calls before each test
    });

    test('should render dropdown with default value date', () => {
        render(<SortDropdown sortKey='date' onSortKeyChange={mockOnSortKeyChange} />);

        expect(screen.getByLabelText(/Sort by :/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Sort by :/i)).toHaveValue('date');
        expect(screen.getByText(/Date/i)).toBeInTheDocument();
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
    });

    test('should change dropdown value when changed', () => {
        render(<SortDropdown sortKey='date' onSortKeyChange={mockOnSortKeyChange} />);
        const dropdownElement = screen.getByLabelText(/Sort by :/i);
        expect(dropdownElement).toHaveValue('date');
        fireEvent.change(dropdownElement, { target: { value: 'name' } })
        expect(mockOnSortKeyChange).toHaveBeenCalledWith('name');
    });
});
