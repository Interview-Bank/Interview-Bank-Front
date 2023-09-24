import { Title, Button, SeoHead } from '@/components/atoms';
import { InquiryInput, InquiryTextArea } from '@/components/molecules';
import { emailPatternCheck } from '@/pages/api/emailPatternCheck';
import { registerService } from '@/pages/api/register/register';
import { modalSlice } from '@/redux/modalReducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleInputLimit: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const InquiryPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inquiryData, setInquiryData] = useState({
    content        : '',
    email           : '',
    title        : '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email           : '',
  })

  const onChangeRegisterData = (name: string, value: string) => {
    setInquiryData((prev) => { return { ...prev, [name]: value } });
    validateInquiryData(name, value);
  }
  const validateInquiryData = (name: string, value: string) => {
      if(name == 'email'){
        if (!emailPatternCheck(value)
            && value.length) {
          setErrorMessage((prev) => { return { ...prev, [name]: "이메일 형식이 올바르지 않습니다." } });
        } else {
          setErrorMessage((prev) => { return { ...prev, [name]: "" } });
        }
      }
  }
  const validationCheckForInquiryService = () => {
    if (inquiryData.title == "") {
      dispatch(modalSlice.actions.OPEN(
				{ title: "제목이 작성되지 않았습니다.", content: "문의하실 글의 제목을 입력해주세요." }
			));
      return false;
    }
    if (inquiryData.email = "") {
      dispatch(modalSlice.actions.OPEN(
				{ title: "이메일 주소가 작성되지 않았습니다.", content: "답변받으실 이메일 주소를 입력해주세요." }
			));
      return false;
    }
    if (inquiryData.content == "") {
      dispatch(modalSlice.actions.OPEN(
				{ title: "내용이 작성되지 않았습니다.", content: "문의하실 글의 내용을 입력해주세요." }
			));
      return false;
    }

    return true;
  }

  const inquriyDataSubmit = () => {
    // if (validationCheckForInquiryService()) {
    //   registerService(inquiryData)
    //     .then(response => router.push('/'))
    //     .catch(reject=>alert(reject))
    // }
    console.log("inquriyDataSubmit")
  }
  return (
    <section className="inquiry__area">
    <SeoHead title='문의하기' />
    <Title title='문의하기' />
    <div className="inquiry__form">
      <InquiryInput
        title             = '답변받으실 이메일을 입력해주세요.'
        name              = 'email'
        value             = {inquiryData.email}
        placeholder       = '이메일을 입력해주세요.'
        maxLength         = {254}
        onChangeEvent     = {onChangeRegisterData}
        errorMessage      = {errorMessage.email}
      />
      <InquiryInput
        title             = '제목을 입력해주세요.'
        name              = 'title'
        value             = {inquiryData.title}
        placeholder       = '제목을 입력해주세요.'
        maxLength         = {128}
        onChangeEvent     = {onChangeRegisterData}
      />
      <InquiryTextArea
          title='내용을 입력해주세요.'
          name='content'
          value={inquiryData.content}
          placeholder='내용을 입력해주세요.'
          onChange={props.onChange}
          handleInputLimit = {props.handleInputLimit}
      />
      <Button value='문의하기' onClickEvent={inquriyDataSubmit}/>
    </div>
  </section>
  )
}

export default InquiryPage;