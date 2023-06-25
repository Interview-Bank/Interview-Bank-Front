import { Button } from '@/components/atoms/Button';
import { SeoHead } from '@/components/atoms/SeoHead';
import { InterviewTitleArea } from '@/components/molecules/Interview/InterviewTitleArea';
import { QuestionComponent } from '@/components/molecules/QuestionComponent';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { bringScrapOriginalListData, sendScrapData } from '../api/Scrap/scrapFetchDataAPI';

const ScrapPage = ({response}) => {
  const router = useRouter();  
  const inputRefs = useRef([]);
  const [toggle, setToggle] = useState(false);
  const [contents, setContents] = useState([]);
  const [interviewList, setInterviewList] = useState({});
  const [answers, setAnswers] = useState({});
  const [inputValues, setInputValues] = useState({});

  const toggleSwitch = () => {
    setToggle(prev => !prev);
  }
  
  const toggleAnswerInput = (index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: !prevAnswers[index],
    }));
  };
  // const toggleAnswerInput = (index) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [index]: !prevAnswers[index],
  //   }));
  // };

  // const handleInputChange = (index, e) => {
  //   setInputValues({ ...inputValues, [index]: e.target.value });
  //   e.target.style.height = "inherit";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  // const handleWrapperClick = (e) => {
  //   e.stopPropagation();
  // };

  useEffect(() => {
    bringScrapOriginalListData(router.query.id)
      .then(response => {
        setInterviewList(response)
        setContents(response.scrapQuestionWithScrapAnswersList)
      })
      .catch(reject => console.log(reject));
  }, []);

  useEffect(() => {
    inputRefs.current.forEach((inputRef, index) => {
      if (answers[index]) {
        inputRef.style.height = "auto";
        inputRef.style.height = inputRef.scrollHeight + "px";
      }
    });
  }, [answers]);

  useEffect(() => {
    setInputValues(
      contents.map((item) =>
        item.scrapAnswerResponseList[0].content === null
          ? ""
          : item.scrapAnswerResponseList[0].content
      )
    );
  }, [contents]);

  const handleInputChange = (index, e) => {
    setInputValues({ ...inputValues, [index]: e.target.value });
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleInputLimit = (e) => {
    const maxLengthInBytes = 65535;
    const inputText = e.target.value;
    const byteCount = new Blob([inputText]).size;
  
    if (byteCount > maxLengthInBytes) {
      e.target.setCustomValidity("글자 수가 65,535 바이트를 초과하였습니다.");
      e.target.reportValidity();
      e.target.value = inputText.slice(0, maxLengthInBytes);
    } else {
      e.target.setCustomValidity("");
    }
  };

  const saveScrapAnswers = () => {
    contents.map(async (item, index) => {
      let updateContent = inputValues[index] === undefined
        ? (item.scrapAnswerResponseList[0].content === null ? "" : item.scrapAnswerResponseList[0].content)
        : inputValues[index];
      sendScrapData(item, updateContent, router.query.id)
        .then(response => router.push(`/scraps/${router.query.id}`))
        .catch(reject => console.log(reject))
    });
  }

  return (
    <section className="scrap__area">
      {interviewList.scrap !== undefined
        &&  <>
              <SeoHead title='' />
              <div className="scrap__body">
                <InterviewTitleArea
                  title={interviewList.scrap.title}
                  date={interviewList.scrap.createdAt}
                  accountId={interviewList.originalInterview.interviewId}
                  toggle={toggle}
                  toggleSwitch={toggleSwitch}
                  propsValue={'scrap'}
                />
                {interviewList.scrapQuestionWithScrapAnswersList &&
                  <div className="questions__area">
                    {interviewList.scrapQuestionWithScrapAnswersList.map((item, index) => (
                      <QuestionComponent
                        item={item}
                        index={index}
                        key={index}
                        answers = {answers}
                        inputValues = {inputValues}
                        toggleAnswerInput = {toggleAnswerInput}
                        handleInputChange={handleInputChange}
                        handleInputLimit={handleInputLimit}
                        inputRefs={inputRefs}
                      /> 
                    ))}
                  </div>
                  // response.questions.map((item, index) => (
                  //   <InterviewView content={item.content} key={index} />
                  // )) 
                }
                <div className="scrap__btn">    
                  <Button value='저장' onClickEvent={saveScrapAnswers} backgroundColor="blue" color="white" borderColor='0'/>
                </div>
              </div>
            </>
      }
    </section>
  )
}
  
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const headers = setTokenHeaders();
//   // const response = [];
//   // let headers;
//   // if (typeof window !== undefined) {
//   //   headers = setTokenHeaders();
//   // };
//   console.log();

//   // const token = useSelector((state: RootState<TokenModalStateType>) => state.token);
  
//   bringScrapOriginalListData(context.query.id, headers)
//     .then(response => console.log(response))
//     .catch(reject => console.log(reject))
// 	// const response = await axios.get(`https://bstaging.interviewbank.net/scraps/${context.query.id}`, {headers})
//   return {
// 		props: {
// 			// response: response.data
// 			response: '1'
//     }
//   };
// }

export default ScrapPage;