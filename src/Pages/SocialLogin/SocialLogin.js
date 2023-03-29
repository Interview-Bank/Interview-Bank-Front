import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SocialLogin = () => {
    console.log("SocialLogin")
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const state = urlParams.get("state")
        console.log(code)
        console.log(state)
        axios.post(`http://localhost:8084/account/oauth/google/login/redirect?code=${code}&state=${state}`)
          .then(response => {
            console.log(response);
            navigate("/")
          })
          .catch(error => {
            console.log(error);
          });
    }, [])
    

  return (
    <div>SocialLogin</div>
  )
}

export default SocialLogin