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

interface UserList {
  id: number;
  email: string;
  data?: object;
  uid?: string;
}

interface UsersChannnel {
  id: number;
}

interface Message {
  receiver_id: number;
  receiver_class: string;
  body: string;
  data?: object;
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

export const getUsers = async (headers: any): Promise<{ uid: string, data: UserList[] }> => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const { "access-token": accessToken, client, expiry, uid } = authData;

  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersChannel = async (headers: any): Promise<UsersChannnel[]> => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const { "access-token": accessToken, client, expiry, uid } = authData;

  try {
    const response = await axios.get(`${API_URL}/channels`, {
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessages = async (receiverId: number, receiverClass: string, headers: any): Promise<{data: Message[]}> => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const { "access-token": accessToken, client, expiry, uid } = authData;

  try {
    const response = await axios.get(`${API_URL}/messages`, {
      params: {
        receiver_id: receiverId,
        receiver_class: receiverClass
      },
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const sendMessage = async (messageData: Message, headers: any) => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const { "access-token": accessToken, client, expiry, uid } = authData;

  try {
    const response = await axios.post(`${API_URL}/messages`, messageData, {
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
