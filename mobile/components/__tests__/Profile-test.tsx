import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileCard from '@/app/(tabs)/profile';

describe('ProfileCard Component', () => {
  test('renders initial content correctly', () => {
    const { getByText } = render(<ProfileCard />);

    expect(getByText('John Doe')).toBeTruthy();
    
    expect(getByText('john.doe@test.com')).toBeTruthy();
    
    expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies.')).toBeTruthy(); 
  });
});
