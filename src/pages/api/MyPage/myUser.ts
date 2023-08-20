import axiosInstance from '../axiosInstance';

const FecthUserData = async () => {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/account/me`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { FecthUserData };