import axios from 'axios';
import { setTokenHeaders } from './apiGetTokenHeader';

export const FetchUserData = async () => {
    const headers = setTokenHeaders();
    try {
        const response = await axios.get(
        `https://bstaging.interviewbank.net/account/me`,
        { headers }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
