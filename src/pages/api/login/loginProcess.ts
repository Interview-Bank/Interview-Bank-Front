import axios from 'axios';

const isLogin = async (values) => {
  const { email, password } = values;
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const loginSubmit = async (values) => {
  const { email, password } = values;
  try {
    await axios
      .post(process.env.dev.NEXT_PUBLIC_KAKAOMAP_APPKEY + "account/login", {
        email,
        password,
      })
      .then((res) => {
        setCookieExpires('authToken', res.headers.get("X-Auth-Token"));
        setCookie('userId', res.data.accountId);
        setCookie('user', res.data.nickname);
        setLoginError({})
        if ((window.location.pathname === '/select' || window.location.pathname === '/signup')) navigate('/');
        else window.location.reload();
      });
  } catch (e) {
    setLoginError({errorMessage : "이메일 또는 비밀번호를 다시 확인해주세요."})
  }
};

export { isLogin };