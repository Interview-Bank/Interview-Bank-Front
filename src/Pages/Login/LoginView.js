import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import styled from "styled-components";
import Kakao from "../../Assets/Images/kakaotalk.png";
import Naver from "../../Assets/Images/naver.png";
import Google from "../../Assets/Images/google.png";


const LoginView = ({ loginSubmit, navigate, loginError, handleGoogleOauth }) => {

  return (
    <>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={loginSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <LoginWrapper>
          <h2>Interview Bank</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <LoginInput
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  placeholder="이메일"
                />
              </div>
              <div className="input-forms-item">
                <LoginInput
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                  placeholder="비밀번호"
                />
              </div>
              <ErrorMessage>
                {loginError.errorMessage}
              </ErrorMessage>
              <LoginButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                로그인
              </LoginButton>
            </div>
          </form>
          <AdditionalBox>
            <span
              onClick={() => {
                navigate("/select");
              }}
            >
              회원가입
            </span>
            <span
              onClick={() => {
                navigate("/find");
              }}
            >
              비밀번호 찾기
            </span>
          </AdditionalBox>
          <SocialLoginBox>
            <h5>다른 방식으로 로그인</h5>
            <div>
              <SocialLoginButton>
                <img src={Kakao} alt="kakaotalk" />
              </SocialLoginButton>
              <SocialLoginButton
                onClick={handleGoogleOauth}>
                <img src={Google} alt="Google" />
              </SocialLoginButton>
              <SocialLoginButton>
                <img src={Naver} alt="Naver" />
              </SocialLoginButton>
            </div>
          </SocialLoginBox>
        </LoginWrapper>
      )}
    </Formik>
    </>
  );
};
const LoginWrapper = styled.div`
  margin-top: 20px;
  display: block;
  > h2 {
    margin-top: 25px;
    color: #2e55e7;
    font-size: 28px;
    font-weight: 600;
  }
`;

const LoginInput = styled.input`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  width: 314px;
  height: 44px;
  font-size: 13px;
  z-index: 2;
  padding-left: 12px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  border: 1px solid #2e55e7;
  background-color: #2e55e7;
  color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  font-family: "Inter", sans-serif;
  font-weight: bolder;
  font-size: 14px;
  z-index: 2;
`;

const AdditionalBox = styled.div`
  color: #a5a5a5;
  margin-left: 10px;
  font-size: 13px;
  margin-top: 10px;
  text-align: end;
  cursor: pointer;
  border: none;
  background-color: #fff;
  font-weight: 600;
  > span {
    margin-left: 15px;
    :hover {
      color: #2e55e7;
    }
  }
`;

const SocialLoginBox = styled.div`
  > h5 {
    margin-top: 35px;
    color: #a5a5a5;
  }
  > div {
    margin-top: 5px;
    justify-content: center;
    gap: 15px;
    display: flex;
  }
`;

const SocialLoginButton = styled.button`
  border: none;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  > img {
    gap: 15px;
    display: flex;
    width: 3.2rem;
  }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 20px;
    font-size: 13px;
    font-family: "Inter", sans-serif;
`
export default LoginView;
