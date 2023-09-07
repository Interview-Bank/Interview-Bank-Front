import { SeoHead } from '@/components/atoms/SeoHead';
import { MultiReadSelect } from '@/components/molecules';
import { AnswerComponent } from '@/components/molecules/AnswerComponent';
import { InterviewTitleArea } from '@/components/molecules/Interview/InterviewTitleArea';
import InterviewView from '@/components/molecules/InterviewView/InterviewView';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface InterviewPageProps {
	interviewInfo: {
		accountId					: number;
		careerYear				: string;
		createdAt					: string;
		interviewId				: number;
		interviewPeriod		: string;
		jobCategory				:	{
													jobCategoryId		: number;
													firstLevelName	: string;
													secondLevelName	: string;
												}
		questions					: {
													content					: string;
													createdAt				: string;
													deletedAt			  : string;
													deletedFlag			: boolean;
													gptAnswer				: string;
													questionId			: number;
													updatedAt				: string;
												}[]			
		title							: string;
		writerNickname		: string;
		view							: number;
	}
}

const InterviewPage = ({ interviewInfo }: InterviewPageProps) => {
  const [interview, setInterview] = useState({});
  const [accountId, setAccountId] = useState(0);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setAccountId(interviewInfo.accountId);
		setInterview(interviewInfo);
	}, []);

	const toggleSwitch = () => {
    setToggle(prev => !prev);
  }

  return (
		<section className='interview__area'>
			<SeoHead title={interviewInfo.title} />
			<div className="interview__body">
				<InterviewTitleArea
					title						= {interviewInfo.title}
					date						= {interviewInfo.createdAt.slice(0, 10).replaceAll('-', '.')}
					accountId				= {interviewInfo.accountId}
					toggle					= {toggle}
					toggleSwitch		= {toggleSwitch}
					writerNickname	= {interviewInfo.writerNickname}
					view						= {interviewInfo.view}
				/>
				<MultiReadSelect
					interviewPeriod	= {interviewInfo.interviewPeriod}
					careerYear			= {interviewInfo.careerYear}
					firstLevelName	=	{interviewInfo.jobCategory?.firstLevelName}
					secondLevelName	=	{interviewInfo.jobCategory?.secondLevelName}
				/>
				{toggle 
					? interviewInfo.questions?.map((item, index) => (
						// 	<InterviewView
						// 		key={index}
						// 		content = {item.gptAnswer}
						// />
							<AnswerComponent 
								item			=	{item}
								key				=	{index}
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