import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import History from '../Components/History';
import { vi } from 'vitest';

// Mocking the fetch function so we can control the API response
global.fetch = vi.fn();

describe('History Component Tests', () => {
  afterEach(() => {
    vi.resetAllMocks(); // Reset fetch after every test
  });

  
  
  // 1️ Test: Heading is always shown
  test('renders heading "History"', () => {
    fetch.mockResolvedValueOnce({ json: async () => [] }); // dummy fetch

    render(<History />);

    // Check if the heading is present
    
    const heading = screen.getByText("History");
    expect(heading).toBeInTheDocument();
  });

  // 2️ Test: When there is no history data (empty array)
  test('shows "No history available" when data is empty', async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });

    render(<History />);

    // Wait for the message to appear on screen
    const emptyMessage = await screen.findByText(/no history available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  
  
  // 3️ Test: When valid history data is returned
  test('shows list items when history is fetched', async () => {
    // This data will simulate what the API sends
    const fakeData = [
      { ID: 1, Weight: 70, Height: 1.75, BMI: 22.86 },
    ];

    fetch.mockResolvedValueOnce({ json: async () => fakeData });

    render(<History />);

    // Wait for the data to appear
    await waitFor(() => {
      expect(screen.getByText(/weight: 70 kg/i)).toBeInTheDocument();
      expect(screen.getByText(/height: 1.75 m/i)).toBeInTheDocument();
      expect(screen.getByText(/bmi: 22.86/i)).toBeInTheDocument();
    });
  });

  
  
  // 4️ Test: When delete button is clicked
  test('removes item from list when delete is clicked', async () => {
    const fakeData = [
      { ID: 1, Weight: 70, Height: 1.75, BMI: 22.86 },
    ];

    // First fetch (GET): returns 1 item
    fetch.mockResolvedValueOnce({ json: async () => fakeData });

    // Second fetch (DELETE): simulates successful deletion
    fetch.mockResolvedValueOnce({ json: async () => ({}) });

    render(<History />);

    // Wait for the item to be displayed
    await waitFor(() => {
      expect(screen.getByText(/weight: 70 kg/i)).toBeInTheDocument();
    });

    // Find the delete button and click it
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    // Wait and check that the item is no longer in the document
    await waitFor(() => {
      expect(screen.queryByText(/weight: 70 kg/i)).not.toBeInTheDocument();
    });
  });

});
