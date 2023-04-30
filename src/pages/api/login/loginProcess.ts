import axios from 'axios';
import { setCookie, setCookieExpires } from './loginCheck';

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

const isLogout = async (token: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/logout`, {}, token);
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { isLogin, isLogout };