import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ConnectionPage from '@/app/(tabs)/connexion';
import { Alert } from 'react-native';
import request from '@/constants/Request';

jest.spyOn(Alert, 'alert');


describe('ConnectionPage Component', () => {
  it('renders all input fields and the login button', () => {
    const { getByPlaceholderText, getByText } = render(<ConnectionPage />);

    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('updates state when text is entered in input fields', () => {
    const { getByPlaceholderText } = render(<ConnectionPage />);

    fireEvent.changeText(getByPlaceholderText('email'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    expect(getByPlaceholderText('email').props.value).toBe('john.doe@example.com');
    expect(getByPlaceholderText('Password').props.value).toBe('password123');
  });

});
