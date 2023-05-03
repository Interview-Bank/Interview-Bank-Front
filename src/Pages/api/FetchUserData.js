import axios from 'axios';
import { setTokenHeaders } from './apiGetTokenHeader';

export const FetchUserData = async () => {
    const AccountBaseUrl = process.env.REACT_APP_API_ACCOUNT_BASE_URL;

    const headers = setTokenHeaders();
    try {
        const response = await axios.get(
        `${AccountBaseUrl}/me`,
        { headers }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
