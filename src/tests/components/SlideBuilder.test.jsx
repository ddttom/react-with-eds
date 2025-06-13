import React from 'react';
import { render, screen } from '@testing-library/react';
import SlideBuilder from '../../components/SlideBuilder';

describe('SlideBuilder', () => {
  const mockSlides = [
    {
      path: '/slide1',
      title: 'Test Slide 1',
      description: 'Description 1',
      image: '/image1.jpg',
    },
    {
      path: '/slide2',
      title: 'Test Slide 2',
      description: 'Description 2',
      image: '/image2.jpg',
    },
  ];

  it('renders without crashing', () => {
    render(<SlideBuilder slides={mockSlides} />);
  });

  it('renders all slides', () => {
    render(<SlideBuilder slides={mockSlides} />);
    expect(screen.getByText('Test Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Test Slide 2')).toBeInTheDocument();
  });

  it('renders empty state when no slides provided', () => {
    render(<SlideBuilder slides={[]} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
}); 
