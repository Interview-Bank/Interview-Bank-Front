import axios from 'axios';
import { setCookie, setCookieExpires, setTokenHeaders } from './loginCheck';

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
  const headers = setTokenHeaders();
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/logout`, {}, { headers });
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const isReceiveProfileImage = async () => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account/me`, { headers });
    return response.data.imageUrl;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { isLogin, isLogout, isReceiveProfileImage };