import React, { useState } from "react";
import styled from "styled-components";
import CreateQuestionsView from "./CreateQuestionsView";

function CreateQuestionsContainer({ content, onCreate, onChange, onAddInput }) {
  const [isOpen, setIsOpen] = useState(true);
  const onToggle = () => setIsOpen(!isOpen);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onCreate();
    }
  };
  return (
    <CreateQuestionsView
      isOpen={isOpen}
      onToggle={onToggle}
      content={content}
      onCreate={onCreate}
      onChange={onChange}
      onAddInput={onAddInput}
      handleKeyDown = {handleKeyDown}
    />
  );
}

export default CreateQuestionsContainer;