import { SeoHead } from '@/components/atoms/SeoHead';
import { Title } from '@/components/atoms/Title';
import { InterviewTitleArea } from '@/components/molecules/Interview/InterviewTitleArea';
import InterviewView from '@/components/molecules/InterviewView/InterviewView';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getDateFormatString } from '../api/dateConvert';
import { getCookieValue, setTokenHeaders } from '../api/login/loginCheck';
import { QuestionComponent } from '@/components/molecules/QuestionComponent';
import { CareerYearType } from '../types/CareerYearType';
import { InterviewPeriodType } from '../types/InterviewPeriodType';

interface InterviewPageProps {
	interviewInfo: {
		accountId					: number;
		careerYear				: CareerYearType;
		createdAt					: string;
		interviewId				: number;
		interviewPeriod		: InterviewPeriodType;
		jobCategory				:	{
													jobCategoryId		: number;
													firstLevelName	: string;
													secondLevelName	: string;
												}
		questions					: {
													content					: string;
													createdAt				: string;
													deletedAt			 ?: string | null;
													deletedFalg			: boolean;
													gptAnswer				: string;
													questionId			: number;
													updatedAt				: string;
												}[]			
		title							: string;
	}
}

const InterviewPage = ({ interviewInfo }: InterviewPageProps) => {
	const router = useRouter();
  const [interview, setInterview] = useState({});
  const [contents, setContents] = useState([]);
  const [accountId, setAccountId] = useState(0);
	const [scrapModal, setScrapModal] = useState(false);
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState(0);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setAccountId(interviewInfo.accountId);
		setInterview(interviewInfo);
		setContents(interviewInfo.questions);
		console.log(interviewInfo);
		// setToken(setTokenHeaders()["X-Auth-Token"]);
		// setUserId(Number(getCookieValue("userId")));
		// userId = Number(getCookieValue("userId"));
	}, []);

	const toggleSwitch = () => {
    setToggle(prev => !prev);
  }

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
			<SeoHead title={interviewInfo.title} />
			<div className="interview__body">
				<InterviewTitleArea
					title={interviewInfo.title}
					date={interviewInfo.createdAt.slice(0, 10).replaceAll('-', '.')}
					accountId={interviewInfo.accountId}
					toggle={toggle}
					toggleSwitch={toggleSwitch}
				/>
				{toggle 
					? interviewInfo.questions?.map((item, index) => (
							<InterviewView
								key={index}
								content = {item.gptAnswer}
							/>
						))
					: interviewInfo.questions?.map((item, index) => (
							<InterviewView content={item.content} key={index} />
						)) 
				}
			</div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await axios.get(`https://bstaging.interviewbank.net/interview/${context.query.id}`)
  return {
		props: {
			interviewInfo: response.data
    }
  };
}

export default InterviewPage;