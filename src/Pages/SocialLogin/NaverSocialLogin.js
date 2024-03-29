import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setCookie, setCookieExpires } from '../api/loginApi';

const NaverSocialLogin = () => {
    const AccountOauthBaseUrl = process.env.REACT_APP_API_ACCOUNT_OAUTH_BASE_URL
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const state = urlParams.get("state")
        const error = urlParams.get("error")
        const errorDescription = urlParams.get("error_description")
    
        if (error && errorDescription) {
            axios.post(`${AccountOauthBaseUrl}/naver/login/redirect?error=${error}&error_description=${errorDescription}`)
                .catch(error => {
                    console.log(error);
                });
            return;
        }
        axios.post(`${AccountOauthBaseUrl}/naver/login/redirect?code=${code}&state=${state}`)
          .then((res) => {
            setCookieExpires('authToken', res.headers.get("X-Auth-Token"));
            setCookie('userId', res.data.accountId);
            setCookie('user', res.data.nickname);
            navigate("/")
            console.log("res")
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

export default NaverSocialLogin