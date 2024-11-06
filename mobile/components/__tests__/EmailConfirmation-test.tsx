import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailConfirmation from '@/app/(tabs)/emailConfirmation';

describe('EmailConfirmation Component', () => {
  it('renders the title, instruction, input, and button correctly', () => {
    const { getByText, getByPlaceholderText } = render(<EmailConfirmation />);

    expect(getByText('Email Confirmation')).toBeTruthy();
    expect(getByText('Please enter the confirmation code sent to your email.')).toBeTruthy();
    expect(getByPlaceholderText('Enter confirmation code')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('updates the confirmation code state when typing', () => {
    const { getByPlaceholderText } = render(<EmailConfirmation />);
    const input = getByPlaceholderText('Enter confirmation code');

    fireEvent.changeText(input, '123456');
    expect(input.props.value).toBe('123456');
  });
});
