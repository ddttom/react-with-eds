import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SlideItem from '../../components/SlideItem';

describe('SlideItem', () => {
  const mockSlideData = {
    path: '/slide1',
    title: 'Test Slide',
    description: 'Test Description',
    image: '/test-image.jpg',
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('<p>Supporting text</p>'),
      })
    );
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
  });

  it('renders without crashing', () => {
    render(<SlideItem slideData={mockSlideData} index={0} />);
  });

  it('displays slide title and description', () => {
    render(<SlideItem slideData={mockSlideData} index={0} />);
    expect(screen.getByText('Test Slide')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows panel when clicked', async () => {
    render(<SlideItem slideData={mockSlideData} index={0} />);
    const slideElement = screen.getByText('Test Slide').closest('.slide-builder-item');
    fireEvent.click(slideElement);
    // Wait for the close button to appear, indicating the modal is open
    expect(await screen.findByLabelText('Close panel')).toBeInTheDocument();
  });
}); 
