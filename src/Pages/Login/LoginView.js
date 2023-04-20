import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import styled from "styled-components";
import Kakao from "../../Assets/Images/kakaotalk.png";
import Naver from "../../Assets/Images/naver.png";
import Google from "../../Assets/Images/google.png";
import AlertIconUrl from "../../Assets/Icons/alertIcon.png"

const LoginView = ({ loginSubmit, navigate, loginError, handleGoogleOauth, handleKakaoOauth, handleNaverOauth }) => {

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
          <LoginTitle>Interview Bank</LoginTitle>
          <form onSubmit={handleSubmit} autoComplete="off">
            <InputFromWrapper>
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
                <PasswordInput
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                  placeholder="비밀번호"
                />
              </div>
              {loginError.errorMessage && 
                <ErrorMessageWrapper>
                  <AlertIcon src = {AlertIconUrl}/>
                  <ErrorMessage>
                    {loginError.errorMessage}
                  </ErrorMessage>
                </ErrorMessageWrapper>
              }
              <LoginButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                error={loginError.errorMessage}
              >
                로그인
              </LoginButton>
            </InputFromWrapper>
          </form>
          <AdditionalBox>
            <span
              onClick={() => {
                navigate("/select");
              }}
            >
              회원가입
            </span>
            <div></div>
            <span
              onClick={() => {
                navigate("/find");
              }}
            >
              비밀번호 찾기
            </span>
          </AdditionalBox>
          <SocialLoginBox>
            <SocialLoginTitle>다른 계정으로 로그인</SocialLoginTitle>
            <SocialLoginButtonWrapper>
              <SocialLoginButton
                onClick={handleKakaoOauth}>
                <img src={Kakao} alt="kakaotalk" />
              </SocialLoginButton>
              <SocialLoginButton
                onClick={handleGoogleOauth}>
                <img src={Google} alt="Google" />
              </SocialLoginButton>
              <SocialLoginButton
                onClick={handleNaverOauth}>
                <img src={Naver} alt="Naver" />
              </SocialLoginButton>
            </SocialLoginButtonWrapper>
          </SocialLoginBox>
        </LoginWrapper>
      )}
    </Formik>
    </>
  );
};
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 84px;


`;

const LoginTitle = styled.div`
  position: relative;
  width: 234px;
  height: 39px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  text-align: center;

  color: #2E55E7;

  margin: 0 auto;
`;

const InputFromWrapper = styled.div`
  position: relative;

  margin-top: 50px;

`;

const LoginInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 330px;
  height: 45px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #000000;
  ::placeholder{
    color: #AAAAAA;
  }
  z-index: 2;
  padding-left: 16px;
  margin-bottom: 8px;
`;

const PasswordInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 330px;
  height: 45px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #000000;
  ::placeholder{
    color: #AAAAAA;
  }
  z-index: 2;
  padding-left: 16px;
`;

const LoginButton = styled.button`
  width: 330px;
  height: 45px;
  cursor: pointer;
  border: none;
  background-color: #2e55e7;
  color: #fff;
  border-radius: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;

  margin-top: ${props => (props.error ? '0' : '22px')};
  z-index: 2;
`;

const AdditionalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;

  margin-top: 14px;
  margin-right: 40px;
  > span {
    margin-right: 8px;
    cursor: pointer;
    color: #666666;

  }
  > div {
    position: relative;
    width: 1px;
    height: 10px;
    background: #666666;
    margin-right: 8px;
  }
`;

const SocialLoginBox = styled.div`
  margin-top: 50px;
`;

const SocialLoginTitle =styled.div`
  position: relative;
  width: 160px;
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #666666;

  mix-blend-mode: multiply;

  margin: 0 auto;
  margin-bottom: 24px;
`;

const SocialLoginButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
`;

const SocialLoginButton = styled.div`
  border: none;
  background-color: #ffffff;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 32px;
  }
  > img {
    width: 50px;
    height: 50px;
    display: flex;
  }
`;

const ErrorMessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: fit-content;
  height: fit-content;
  align-items: center;

  margin-top: 8px;
  margin-bottom: 12px;
  margin-left: 40px;
`;

const AlertIcon = styled.img`
  position: relative;
  width: 18px;
  height: 18px;
  margin-bottom: 2px;
`;

const ErrorMessage = styled.div`
  position: relative;

  width: 326px;
  height: 21px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #F50D0D;
  margin-left: 2px;
`
export default LoginView;