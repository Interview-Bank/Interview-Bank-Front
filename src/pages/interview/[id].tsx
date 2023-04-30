import { SeoHead } from '@/components/atoms/SeoHead';
import { Title } from '@/components/atoms/Title';
import InterviewView from '@/components/molecules/InterviewView/InterviewView';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getDateFormatString } from '../api/dateConvert';
import { getCookieValue, setTokenHeaders } from '../api/login/loginCheck';

const InterviewPage = ({ response }) => {
	const router = useRouter();
  const [interview, setInterview] = useState({});
  const [contents, setContents] = useState([]);
  const [accountId, setAccountId] = useState(0);
	const [scrapModal, setScrapModal] = useState(false);
	
	const token = setTokenHeaders()["X-Auth-Token"];
	const userId = Number(getCookieValue("userId"));
	console.log(response)

	useEffect(() => {
		setAccountId(response.accountId);
		setInterview(response);
		setContents(response.questions);
	}, []);

  // const handleScrap = () => {
  //   const headers = setTokenHeaders();
  //   axios
  //     .post(
  //       `https://bstaging.interviewbank.net/scraps`,
  //       {
  //         interviewId: interview.interviewId,
  //       },
  //       {
  //         headers,
  //       }
  //     )
  //     .then((result) => {})
  //     .catch((err) => console.log(err));
  //   setScrapModal(true)
  // };
  return (
		<section className='interview__area'>
			<SeoHead title={response.title} />
			<div className="interview__body">
				{response.createdAt.slice(0, 10)}
				<Title title={response.title} />
				{response.questions &&
					response.questions.map((item, index) => (
						<InterviewView content={item.content} />
					)) 
				}
					{/* <BoardTitle>{interview.title}</BoardTitle>
					<BoardDetail>
						<BoardDate>
							{moment(interview.created).add(9, "hour").format("YYYY-MM-DD")}
						</BoardDate>
						{token && accountId === userId && (
							<div>
								<BoardDelete>삭제하기</BoardDelete>
								<BoardEdit>수정하기</BoardEdit>
							</div>
						)}
						{token && accountId !== userId && (
							<BoardScrapButton onClick={handleScrap}>
								★ 스크랩
							</BoardScrapButton>
						)}
						{scrapModal && (
							<ScrapModal
								CloseModal={() => {
									setScrapModal(!scrapModal);
								}}
							>
								<ScrapModalContainer />
							</ScrapModal>
						)}
					</BoardDetail>
					<QuestionsBlock>
						{contents.map((item, index) => (
							<li key={index}>{item.content}</li>
						))}
					</QuestionsBlock> */}
				</div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await axios.get(`https://bstaging.interviewbank.net/interview/${context.query.id}`)
  return {
		props: {
			response: response.data
      // response: response
    }
  };
}

export default InterviewPage;