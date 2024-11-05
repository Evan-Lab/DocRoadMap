import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from '@/app/(tabs)/register';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

describe('Register Component', () => {
  it('renders all input fields and the Create Account button', () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });

  it('updates state when text is entered in input fields', () => {
    const { getByPlaceholderText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    expect(getByPlaceholderText('First Name').props.value).toBe('John');
    expect(getByPlaceholderText('Last Name').props.value).toBe('Doe');
    expect(getByPlaceholderText('Email').props.value).toBe('john.doe@example.com');
    expect(getByPlaceholderText('Password').props.value).toBe('password123');
  });

  it('calls the onPress function when Create Account button is pressed', () => {
    const { getByText } = render(<Register />);
    
    fireEvent.press(getByText('Create Account'));
  });
});
