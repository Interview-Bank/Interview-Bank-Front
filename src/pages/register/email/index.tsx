import { Button } from '@/components/atoms/Button';
import { SeoHead } from '@/components/atoms/SeoHead';
import { RegisterForm } from '@/components/molecules/RegisterForm';
import React from 'react'

type Props = {}

const EmailSignUpPage = (props: Props) => {
  return (
    <section className="email__area">
      <SeoHead title='이메일 회원가입' />
      <h1>회원가입</h1>
      <div className="email__form">
        <RegisterForm title='닉네임' placeholder='닉네임을 입력해주세요.' maxLength={16} />
        <RegisterForm title='이메일' placeholder='이메일을 입력해주세요.' maxLength={254} />
        <RegisterForm title='비밀번호' placeholder='영문,숫자,특수문자 포함 8자이상' maxLength={30} />
        <RegisterForm title='' placeholder='비밀번호를 확인해 주세요' maxLength={30} />
        <Button value='가입하기' />
      </div>
    </section>
  )
}

export default EmailSignUpPage;