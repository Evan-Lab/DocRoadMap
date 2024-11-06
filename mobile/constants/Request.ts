import {
    SwaggerLogin,
    SwaggerRegister
} from './Swagger'
import axios, { AxiosError } from "axios"
import { ExpoRoot } from 'expo-router';
import { Alert } from 'react-native';

export type SwaggerRequest<T> =
  | {
      data: T
      error: null
    }
  | {
      error: string
    }

const url = process.env.EXPO_PUBLIC_API_URL
const request = {
    register: async (data: SwaggerRegister): Promise<SwaggerRequest<SwaggerRegister>> => {
        try {
          const response = await axios.post(
            `${url}/users/register`,
            {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            }
          );
          return {
            data: response.data,
            error: null,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 400) {
              return {
                error: 'Bad request. Please check your data and try again.',
              };
            } else if (status === 409) {
              return {
                error: 'The email address is already in use. Please use a different email.',
              };
            } else if (status === 500) {
              return {
                error: 'Server error. Please try again later.',
              };
            } else {
              return {
                error: `Error: ${status}. Something went wrong.`,
              };
            }
          } else {
            console.error('Unexpected error:', error);
            return {
              error: 'Unexpected error. Please try again later.',
            };
          }
        }
      },
    login: async (data: SwaggerLogin): Promise<SwaggerRequest<SwaggerLogin>> => {
        try {
          const response = await axios.post(
            `${url}/users/login`,
            {
              email: data.email,
              password: data.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            }
          );
          if (response.status === 200) {
            const result = response.data;
            console.log('Login successful:', result);
            Alert.alert('Login successful', 'Logged In!');
            return {
              data: result,
              error: null,
            };
          } else if (response.status === 400) {
            console.warn('Login failed: Bad Request');
            Alert.alert('Bad Request', 'Please check your data and try again.');
            return {
              error: 'Bad Request. Please check your data and try again.',
            };
          } else if (response.status === 404) {
            console.warn('Login failed: Invalid Credentials');
            Alert.alert('Invalid Credentials', 'Please check your email and password.');
            return {
              error: 'Invalid credentials. Please check your email and password.',
            };
          } else {
            console.warn('Unexpected error:', response.status);
            Alert.alert('Unexpected error', 'Something went wrong, please try again later.');
            return {
              error: 'Unexpected error.',
            };
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', error);
            Alert.alert('Request Error', 'Network error. Please try again later.');
            return {
              error: 'Network error. Please try again later.',
            };
          } else {
            console.error('Unexpected error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            return {
              error: 'Something went wrong. Please try again.',
            };
          }
        }
    }
      
}
export default request;