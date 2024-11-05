import {
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

const request = {
    register : async (data: SwaggerRegister) : Promise<SwaggerRequest<SwaggerRegister>> => {
        try {
            const response = await axios.post(
        'http://localhost:3000/users/create',
        {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            processIds: data.processIds ?? "",
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
            return {
                error: 'Something went wrong',
            }
        }       
    }
}
export default request;