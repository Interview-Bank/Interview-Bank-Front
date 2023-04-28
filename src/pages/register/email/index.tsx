import { RegisterForm } from '@/components/molecules/RegisterForm';
import React from 'react'

type Props = {}

const EmailSignUpPage = (props: Props) => {
  return (
    <div className="email__area">
      <h1>Interview Bank</h1>
      <div className="email__form">
        <RegisterForm title='닉네임' placeholder='닉네임을 입력해주세요.'/>
        <RegisterForm title='이메일' placeholder='이메일을 입력해주세요.' />
        <RegisterForm title='비밀번호' placeholder='영문,숫자,특수문자 포함 8자이상'/>
      </div>
    </div>
  )
}

export default EmailSignUpPage;