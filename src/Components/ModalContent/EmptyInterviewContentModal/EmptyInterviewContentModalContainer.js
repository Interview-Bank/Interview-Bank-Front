/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import EmptyInterviewContentModalView from "./EmptyInterviewContentModalView";

const EmptyInterviewContentModalContainer = (props) => {

  return <EmptyInterviewContentModalView onClose = {props.CloseModal}/>;
};

export default EmptyInterviewContentModalContainer;
