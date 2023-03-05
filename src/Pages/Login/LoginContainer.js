import axios from "axios";
import LoginView from "./LoginView";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const API_URL = "https://bstaging.interviewbank.net/";
  const navigate = useNavigate();

  const loginSubmit = async (values) => {
    const { email, password } = values;
    try {
      await axios
        .post(API_URL + "account/login", {
          email,
          password,
        })
        .then((res) => {
          const userId = res.data.accountId;
          const authToken = res.headers.get("X-Auth-Token");
          console.log(authToken);
          localStorage.setItem("user", res.data.nickname);
          alert("로그인 성공");
          window.location.reload();
        });
    } catch (e) {
      alert("아이디 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  return <LoginView loginSubmit={loginSubmit} navigate={navigate} />;
};

export default LoginContainer;
