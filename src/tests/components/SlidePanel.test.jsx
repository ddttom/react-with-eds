import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SlidePanel from '../../components/SlidePanel';

describe('SlidePanel', () => {
  const mockSlideData = {
    path: '/slide1',
    title: 'Test Slide',
    description: 'Test Description',
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('<div>Test Content</div>'),
      })
    );
  });

  it('renders without crashing', async () => {
    render(<SlidePanel slideData={mockSlideData} onClose={mockOnClose} />);
    expect(await screen.findByText('Test Content')).toBeInTheDocument();
  });

  it('renders fetched HTML content', async () => {
    render(<SlidePanel slideData={mockSlideData} onClose={mockOnClose} />);
    expect(await screen.findByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<SlidePanel slideData={mockSlideData} onClose={mockOnClose} />);
    await screen.findByText('Test Content');
    const closeButton = screen.getByLabelText('Close panel');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 
