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

interface UserLists {
  id: any;
  email: string;
  data?: object;
  uid?: string;
  created_at: string;
  updated_at: string;
}
interface ChannelLists {
  id: any;
  email: string;
  data?: object;
  uid?: string;
  created_at: string;
  updated_at: string;
}

interface ChannelData {
  name: string;
  user_ids: number[];
}

interface Message {
  id?: number;
  body: string;
  sender_id: number;
  receiver_id: number;
  created_at?: string;
  updated_at?: string;
  senderEmail?: string;
}
interface Messages {
  receiver_id: number;
  receiver_class: string;
  body: string;
}

interface UsersChannnel {
  id: number;
  name: string;
  data: any;
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

    localStorage.setItem("access-token", response.headers["access-token"]);
    localStorage.setItem("client", response.headers["client"]);
    localStorage.setItem("expiry", response.headers["expiry"]);
    localStorage.setItem("uid", response.headers["uid"]);

    return response.headers;
  } catch (error) {
    console.error(error);
    throw error;
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
    console.error(error);
    throw error;
  }
};

export const getUserss = async (
  headers: any
): Promise<{uid: string; data: UserLists[]}> => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const {"access-token": accessToken, client, expiry, uid} = authData;

  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersChannel = async (
  headers: any
): Promise<{uid: string; data: ChannelLists[]}> => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const {"access-token": accessToken, client, expiry, uid} = authData;

  try {
    const response = await axios.get(`${API_URL}/channels`, {
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessages = async (
  receiverId: number,
  receiverClass: string,
  headers?: any
): Promise<{data: Message[]}> => {
  try {
    const response = await axios.get(`${API_URL}/messages`, {
      params: {
        receiver_id: receiverId,
        receiver_class: receiverClass,
      },
      headers: headers || getAuthHeaders(),
    });

    if (response.data && Array.isArray(response.data)) {
      localStorage.setItem(
        receiverId.toString(),
        JSON.stringify(response.data)
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendMessage = async (messageData: Message, headers: any) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, messageData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};

export const sendMessages = async (messageData: Messages, headers: any) => {
  console.log("sendMessages function called");

  const authFromStorage = localStorage.getItem("auth");
  console.log("auth from localStorage:", authFromStorage);

  const parsedAuth = JSON.parse(authFromStorage || "{}");
  console.log("Parsed auth:", parsedAuth);

  const {"access-token": accessToken, client, expiry, uid} = parsedAuth ?? {};

  console.log("Headers:", {accessToken, client, expiry, uid});
  console.log("Message data:", messageData);

  try {
    const response = await axios.post(`${API_URL}/messages`, messageData, {
      headers: {
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
    });
    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createChannel = async (channelData: ChannelData) => {
  try {
    const response = await axios.post(`${API_URL}/channels`, channelData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAndStoreChannels = async () => {
  try {
    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
    const {"access-token": accessToken, client, expiry, uid} = authData;
    const headers = {
      "access-token": accessToken,
      client: client,
      expiry: expiry,
      uid: uid,
    };

    const channels = await getUsersChannel(headers);

    const currentUser = localStorage.getItem("currentUser");

    if (localStorage.getItem(`${currentUser}.channelLists`)) {
      const oldChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );

      const mergedChannels = [...oldChannels, ...channels.data];

      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(mergedChannels)
      );
    } else {
      localStorage.setItem(
        `${currentUser}.channelLists`,
        JSON.stringify(channels.data)
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
