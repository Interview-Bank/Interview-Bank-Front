import axios from 'axios';

const registerService = async (values: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { registerService };