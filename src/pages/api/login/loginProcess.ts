import axios from 'axios';
import axiosInstance from '../axiosInstance';

const isLogin = async (values: any) => {
  const { email, password } = values;
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/login`, {
      email,
      password
    });
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const isLogout = async () => {
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/account/logout`, {});
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const isReceiveProfileImage = async () => {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/account/me`);
    return response.data.imageUrl;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { isLogin, isLogout, isReceiveProfileImage };