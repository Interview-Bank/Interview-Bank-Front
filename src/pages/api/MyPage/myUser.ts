import axios from 'axios';
import { setTokenHeaders } from '../login/loginCheck';

const FecthUserData = async () => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account/me`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { FecthUserData };