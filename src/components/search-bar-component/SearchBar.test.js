// src/components/search-bar-component/SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom'; // Import jest-dom matchers


describe('SearchBar Component', () => {
    it('renders correctly with the initial search query', () => {
        const mockOnSearchQueryChange = jest.fn();
        render(<SearchBar searchQuery="test" onSearchQueryChange={mockOnSearchQueryChange} />);
        
        const inputElement = screen.getByPlaceholderText(/search events.../i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('test');
    });

    it('calls onSearchQueryChange with the correct value when typing', () => {
        const mockOnSearchQueryChange = jest.fn();
        render(<SearchBar searchQuery="" onSearchQueryChange={mockOnSearchQueryChange} />);
        
        const inputElement = screen.getByPlaceholderText(/search events.../i);
        fireEvent.change(inputElement, { target: { value: 'sample event name' } });
        
        expect(mockOnSearchQueryChange).toHaveBeenCalledTimes(1);
        expect(mockOnSearchQueryChange).toHaveBeenCalledWith('sample event name');
    });
});
