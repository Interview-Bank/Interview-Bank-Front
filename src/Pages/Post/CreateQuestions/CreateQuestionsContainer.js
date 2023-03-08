import React, { useState } from "react";
import styled from "styled-components";
import CreateQuestionsView from "./CreateQuestionsView";

function CreateQuestionsContainer({ content, onCreate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <CreateQuestionsView
      isOpen={isOpen}
      onToggle={onToggle}
      content={content}
      onCreate={onCreate}
      onChange={onChange}
    />
  );
}

export default CreateQuestionsContainer;
