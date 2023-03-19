/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import EmptyInterviewTitleModalView from "./EmptyInterviewTitleModalView";

const EmptyInterviewTitleModalContainer = (props) => {

  return <EmptyInterviewTitleModalView onClose = {props.CloseModal}/>;
};

export default EmptyInterviewTitleModalContainer;
