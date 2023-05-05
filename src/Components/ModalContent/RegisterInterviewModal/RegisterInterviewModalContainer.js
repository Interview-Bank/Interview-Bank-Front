/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import RegisterInterviewModalView from "./RegisterInterviewModalView";

const RegisterInterviewModalContainer = (props) => {

  return <RegisterInterviewModalView onClose = {props.CloseModal}/>;
};

export default RegisterInterviewModalContainer;
