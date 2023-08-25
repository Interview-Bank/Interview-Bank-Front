import axios from 'axios';
import { setTokenHeaders } from '../login/loginCheck';

const isScrap = async (id: any) => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        interviewId: id
      },
      {
        headers
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const deleteInterview = async (interviewId: string) => {
  const headers = setTokenHeaders();
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${interviewId}`, { headers });
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { isScrap, deleteInterview };