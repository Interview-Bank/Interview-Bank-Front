import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import { HiOutlineMail } from "react-icons/hi";

const RegisterSelect = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <SelectionWrapper>
        <h1>회원가입</h1>
        <p>회원가입 방식을 선택하세요.</p>
        <SelectButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          <IconWrapper>
            <HiOutlineMail />
          </IconWrapper>
          카카오로 회원가입
        </SelectButton>

        <SelectButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          <IconWrapper>
            <HiOutlineMail />
          </IconWrapper>
          깃허브로 회원가입
        </SelectButton>

        <SelectButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          <IconWrapper>
            <HiOutlineMail />
          </IconWrapper>
          네이버로 회원가입
        </SelectButton>

        <SelectButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          <IconWrapper>
            <HiOutlineMail />
          </IconWrapper>
          이메일로 회원가입
        </SelectButton>
      </SelectionWrapper>
    </Layout>
  );
};

const SelectionWrapper = styled.div`
  margin: 64px auto auto;
  width: 346px;
  height: 676px;
  min-height: 100vh;
  > h1 {
    font-weight: 700;
    text-align: center;
    color: #2e55e7;
    margin-top: 100px;
  }
  > p {
    font-weight: 600;
    text-align: center;
    color: #737373;
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  height: 60px;
  margin-bottom: 18px;
  border: none;
  background-color: #fff;
  font-weight: 700;
  color: #747474;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  :hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
    color: #2e55e7;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #747474;
  font-size: 1.2rem;
  margin-bottom: 2px;
`;

export default RegisterSelect;
