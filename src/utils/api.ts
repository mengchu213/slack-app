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
  uid: string;
  created_at: string;
  updated_at: string;
}

interface ChannelData {
  name: string;
  user_ids: number[];
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

interface UsersChannnel {
  id: number;
  name: string;
  data: any;
}

const catchError = (error: any): Promise<never> => {
  if (error.response) {
    return Promise.reject(
      new Error(
        `Server responded with status code ${error.response.status}. Message: ${error.response.data}`
      )
    );
  } else if (error.request) {
    return Promise.reject(
      new Error("Request was made but no response was received.")
    );
  } else {
    return Promise.reject(
      new Error(`Error in request setup. Message: ${error.message}`)
    );
  }
};

export const registerUser = async (registrationData: RegistrationData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/`, registrationData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, loginData);
    localStorage.setItem("access-token", response.headers["access-token"]);
    localStorage.setItem("client", response.headers["client"]);
    localStorage.setItem("expiry", response.headers["expiry"]);
    localStorage.setItem("uid", response.headers["uid"]);
    return response.headers;
  } catch (error) {
    return catchError(error);
  }
};

export const getAuthHeaders = () => {
  return {
    "access-token": localStorage.getItem("access-token") || "",
    client: localStorage.getItem("client") || "",
    expiry: localStorage.getItem("expiry") || "",
    uid: localStorage.getItem("uid") || "",
  };
};

export const getUsers = async (): Promise<{uid: string; data: User[]}> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getUsersChannel = async (): Promise<UsersChannnel[]> => {
  try {
    const response = await axios.get(`${API_URL}/channels`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMessages = async (
  receiverId: number,
  receiverClass: string
): Promise<{data: Message[]}> => {
  try {
    const response = await axios.get(
      `${API_URL}/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`,
      {headers: getAuthHeaders()}
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const sendMessage = async (messageData: Message) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, messageData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const createChannel = async (channelData: ChannelData) => {
  try {
    const response = await axios.post(`${API_URL}/channels`, channelData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getAndStoreChannels = async () => {
  try {
    const channels = await getUsersChannel();
    const currentUser = localStorage.getItem("currentUser");
    if (localStorage.getItem(`${currentUser}.channelLists`)) {
      const oldChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      const mergedChannels = [...new Set([...oldChannels, ...channels])];
      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(mergedChannels)
      );
    } else {
      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(channels)
      );
    }
  } catch (error) {
    return catchError(error);
  }
};
