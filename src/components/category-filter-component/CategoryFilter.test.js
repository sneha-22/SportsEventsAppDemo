import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import '@testing-library/jest-dom';


describe('CategoryFilter Component', () => {
    const mockFilters = ['Track', 'Field', 'Swimming'];
    const mockFilterChangeHandler = jest.fn();

    beforeEach(() => {
      render(
        <CategoryFilter filters={mockFilters} filterCategory='' onFilterChange={mockFilterChangeHandler} />
      );
    });

    it('renders the filter dropdown with the correct options', () => {
        expect(screen.getByText('All')).toBeInTheDocument();
        mockFilters.forEach(filter => {
            expect(screen.getByText(filter)).toBeInTheDocument();
        });
    });

    it('calls onFilterChange when the filter is changed', () => {
        fireEvent.change(screen.getByLabelText(/Filter :/i), { target: { value: 'Track' } });
        expect(mockFilterChangeHandler).toHaveBeenCalledTimes(1);
        expect(mockFilterChangeHandler).toHaveBeenCalledWith('Track');
    });
});
