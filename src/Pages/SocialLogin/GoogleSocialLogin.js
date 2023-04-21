import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setCookie, setCookieExpires } from '../api/loginApi';

const GoogleSocialLogin = () => {
    const navigate = useNavigate()
    const AccountOauthBaseUrl = process.env.REACT_APP_API_ACCOUNT_OAUTH_BASE_URL


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const state = urlParams.get("state")
        console.log(code)
        console.log(state)
        axios.post(`${AccountOauthBaseUrl}/google/login/redirect?code=${code}&state=${state}`)
          .then((res) => {
            setCookieExpires('authToken', res.headers.get("X-Auth-Token"));
            setCookie('userId', res.data.accountId);
            setCookie('user', res.data.nickname);
            navigate("/")
          })
          .catch(error => {
            console.log(error);
          });
    }, [])
    

  return (
    <>
    </>
  )
}

export default GoogleSocialLogin