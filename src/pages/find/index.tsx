import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { SeoHead } from '@/components/atoms/SeoHead';
import React from 'react';

type Props = {}

const FindPage = (props: Props) => {
  return (
    <section className="find__area">
      <SeoHead title='비밀번호 찾기' />
      <h1>비밀번호 찾기</h1>
      <p>
        비밀번호를 잃어버리셨나요?
        <br />
        인터뷰 뱅크에 가입한 이메일을 입력해 주세요.
        <br />
        이메일을 통해 비밀번호 변경 링크가 전송됩니다.
        <br />
        링크는 3시간이 지나면 만료됩니다.
      </p>
      {/* <Input placeholder="이메일을 입력해주세요." /> */}
      <Button value='이메일 전송' />
    </section>
  )
}

export default FindPage;