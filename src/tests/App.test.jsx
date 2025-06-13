import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the fetch function
global.fetch = jest.fn();

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    // Mock fetch to reject
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch slides/i)).toBeInTheDocument();
    });
  });

  it('loads and displays slides', async () => {
    // Mock successful fetch response
    const mockSlides = {
      data: [
        {
          path: '/slide1',
          title: 'Test Slide 1',
          description: 'Description 1',
          image: '/image1.jpg',
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSlides,
    });

    render(<App />);

    // Wait for slides to load
    await waitFor(() => {
      expect(screen.getByText('Test Slide 1')).toBeInTheDocument();
    });

    // Verify fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledWith('/slides/query-index.json');
  });
}); 
