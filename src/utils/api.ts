import axios from "axios";
import key from "./keys";

const API_URL = key.API_URL;

interface RegistrationData {
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export const registerUser = async (registrationData: RegistrationData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/`, registrationData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, loginData);
    return response.headers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsers = async (headers: any): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {headers});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
