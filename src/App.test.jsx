import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders slides when data is fetched successfully', async () => {
    // Mock successful API response
    const mockSlides = {
      data: [
        {
          path: '/slides/test-slide',
          title: 'Test Slide',
          description: 'Test Description',
          image: '/test-image.jpg',
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSlides,
    });

    render(<App />);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check if slide data is rendered
    expect(screen.getByText('Test Slide')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    // Mock failed API response
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check if error message is displayed
    expect(screen.getByText(/failed to fetch slides/i)).toBeInTheDocument();
  });
}); 
