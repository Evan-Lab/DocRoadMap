import {
  SwaggerCreateCardProcess,
  SwaggerCreateStep,
  SwaggerLogin,
  SwaggerProcessList,
  SwaggerProfileInfo,
  SwaggerRegister,
  SwaggerStepList,
} from './Swagger'
import axios, { AxiosError } from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export type SwaggerRequest<T> =
| {
    data?: T
    error: null
  }
| {
    error?: string
  }

const url = process.env.EXPO_PUBLIC_API_URL

const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

const request = {
  register: async (data: SwaggerRegister): Promise<SwaggerRequest<SwaggerRegister>> => {
      try {
        const response = await axios.post(
          `${url}/auth/register`,
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
          `${url}/auth/login`,
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
        if (response.status === 200 || response.status === 201 ) {
          const result = response.data;
          await AsyncStorage.setItem('accessToken', result.accessToken);
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
  },
  create: async (data: SwaggerCreateCardProcess): Promise<SwaggerRequest<SwaggerCreateCardProcess>> => {
    const accessToken = await getAccessToken(); 
    try {
      const response = await axios.post(
        `${url}/process/create`,
        {
          name: "id card",
          description:"ID card process",
          status: "PENDING",
          userId: 2,
          stepsId: 15,
          endedAt: "2024-12-12, 12:00:00",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`,
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
              return { error: 'Required fields are missing. Please check your inputs and try again.' };
          } else if (status === 409) {
              return { error: 'A card with this name already exists. Please choose a different name.' };
          } else if (status === 500) {
              return { error: 'Server error. Please try again later.' };
          } else if (status === 401) {
              return { error: 'You are not authorized to create a card. Please log in and try again.' };
          } else {
              return { error: `Unexpected error: ${status}. Please try again later.` };
          }
      } else {
          return {error: 'Something went wrong. Please try again.',};
      }
  }
},
createStep: async (data: SwaggerCreateStep): Promise<SwaggerRequest<SwaggerCreateStep>> => {
  const accessToken = await getAccessToken();  
  try {
    const response = await axios.post(
      `${url}/steps/create`,
      {
        name: data.name,
        description: data.description
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
        return { error: 'Invalid data. Please check your inputs and try again.' };
      } else if (status === 404) {
        return { error: 'Process not found. Please check the process ID and try again.' };
      } else if (status === 403) {
        return { error: 'Unauthorized access. You do not have permission to add steps.' };
      } else if (status === 500) {
        return { error: 'Server error. Please try again later.' };
      } else {
        return { error: `Unexpected error: ${status}. Please try again later.` };
      }
    } else {
      return {error: 'Something went wrong. Please try again.',};
    }
  }
},
infoProfile: async (): Promise<SwaggerRequest<SwaggerProfileInfo>> => {
  const accessToken = await getAccessToken();
  try {
      const headers = {
          Authorization: `Bearer ${accessToken}`,
      }
      const response = await axios.get(`${url}/users/me`, {
          headers,
      });
      console.log(response.data)
      return {
          data: response.data,
          error: null,
      }
  } catch (error) {
      return {
          error: 'Unauthorized access. You do not have permission.',
      }
  }
},
stepList: async (): Promise<SwaggerRequest<SwaggerStepList[]>> => {
  const accessToken = await getAccessToken();
  try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      const response = await axios.get(`${url}/steps/all`, { headers });
      console.log(response.data);
      return {
          data: response.data,
          error: null,
      };
  } catch (error) {
      return {
          error: 'Unauthorized access. You do not have permission.',
      };
  }
},
processList:  async (): Promise<SwaggerRequest<SwaggerProcessList[]>> => {
  const accessToken = await getAccessToken();
  try {
      const headers = {
          Authorization: `Bearer ${accessToken}`,
      }
      const response = await axios.get(`${url}/process/all`, { headers });
      console.log(response.data)
      return {
          data: response.data,
          error: null,
      }
  } catch (error) {
      return {
          error: 'Unauthorized access. You do not have permission.',
      }
  }
  },
}
export default request;