import { Button } from '@/components/atoms/Button';
import { SeoHead } from '@/components/atoms/SeoHead';
import { RegisterForm } from '@/components/molecules/RegisterForm';
import { registerService } from '@/pages/api/register/register';
import { modalSlice } from '@/redux/modalReducer';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

type Props = {}

const EmailSignUpPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const onChangeRegisterData = (name: string, value: string) => {
    setRegisterData((prev) => { return { ...prev, [name]: value } });
    validateRegisterData(name, value);
  }

  const validateRegisterData = (name: string, value: string) => {
    switch (name) {
      case 'email':
        if (!value.toLowerCase().match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
            && value.length) {
          setErrorMessage((prev) => { return { ...prev, [name]: "이메일 형식이 올바르지 않습니다." } });
        } else {
          setErrorMessage((prev) => { return { ...prev, [name]: "" } });
        }
        break;
      case 'nickname':
        if (!value.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,16}$/)
            && value.length) {
          setErrorMessage((prev) => { return { ...prev, [name]: "1글자 이상 16글자 이하로 입력해주세요." } });
        } else {
          setErrorMessage((prev) => { return { ...prev, [name]: "" } });
        }
        break;
      case 'password':
        if (!value.toLowerCase().match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/)
            && value.length) {
          setErrorMessage((prev) => { return { ...prev, [name]: "영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요." } });
        } else {
          setErrorMessage((prev) => { return { ...prev, [name]: "" } });
        }
        break;
      default: break;
    }
  }

  useEffect(() => {
    if (registerData.password && registerData.passwordConfirm && registerData.password !== registerData.passwordConfirm) {
      setErrorMessage((prev) => { return { ...prev, passwordConfirm: "비밀번호가 일치하지 않습니다." } });
    } else {
      setErrorMessage((prev) => { return { ...prev, passwordConfirm: "" } });
    }
  }, [registerData.password, registerData.passwordConfirm])

  const validationCheckForRegistService = () => {
    if (!registerData.nickname || errorMessage.nickname) {
      dispatch(modalSlice.actions.OPEN(
				{ title: "닉네임을 확인해주세요.", content: "" }
			));
      return false;
    }
    if (!registerData.email || errorMessage.email) {
      dispatch(modalSlice.actions.OPEN(
				{ title: "이메일을 확인해주세요.", content: "" }
			));
      return false;
    }
    if ((!registerData.password || errorMessage.password)
        || (!registerData.passwordConfirm || errorMessage.passwordConfirm)) {
      dispatch(modalSlice.actions.OPEN(
				{ title: "비밀번호를 확인해주세요.", content: "" }
			));
      return false;
    }

    return true;
  }

  const registDataSubmit = () => {
    if (validationCheckForRegistService()) {
      registerService(registerData)
        .then(response => router.push('/'))
        .catch(reject=>alert(reject))
    }
  }

  return (
    <section className="email__area">
      <SeoHead title='이메일 회원가입' />
      <h1>회원가입</h1>
      <div className="email__form">
        <RegisterForm title='닉네임' placeholder='닉네임을 입력해주세요.' maxLength={16} name='nickname' onChange={onChangeRegisterData} errorMessage={errorMessage.nickname} />
        <RegisterForm title='이메일' placeholder='이메일을 입력해주세요.' maxLength={254} name='email' onChange={onChangeRegisterData} errorMessage={errorMessage.email} />
        <RegisterForm title='비밀번호' placeholder='영문,숫자,특수문자 포함 8자이상' maxLength={30} name='password' onChange={onChangeRegisterData} errorMessage={errorMessage.password} type="password"/>
        <RegisterForm title='' placeholder='비밀번호를 확인해 주세요' maxLength={30} name='passwordConfirm' onChange={onChangeRegisterData} errorMessage={errorMessage.passwordConfirm} type="password"/>
        <Button value='가입하기' onClickEvent={registDataSubmit}/>
      </div>
    </section>
  )
}

export default EmailSignUpPage;