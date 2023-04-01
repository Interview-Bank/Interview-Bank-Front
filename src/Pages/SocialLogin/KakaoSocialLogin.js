import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setCookie, setCookieExpires } from '../api/loginApi';

const KakaoSocialLogin = () => {
    console.log("SocialLogin")
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const state = urlParams.get("state")
        console.log(code)
        console.log(state)
        axios.post(`https://bstaging.interviewbank.net/account/oauth/kakao/login/redirect?code=${code}&state=${state}`)
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

export default KakaoSocialLogin