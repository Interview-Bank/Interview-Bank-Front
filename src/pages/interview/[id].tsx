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

const InterviewPage = ({ response }) => {
	const router = useRouter();
  const [interview, setInterview] = useState({});
  const [contents, setContents] = useState([]);
  const [accountId, setAccountId] = useState(0);
	const [scrapModal, setScrapModal] = useState(false);
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState(0);
	const [toggle, setToggle] = useState(false);
	
	// const token = setTokenHeaders()["X-Auth-Token"];
	// const userId = Number(getCookieValue("userId"));

	useEffect(() => {
		setAccountId(response.accountId);
		setInterview(response);
		setContents(response.questions);
		console.log(response);
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
			<SeoHead title={response.title} />
			<div className="interview__body">
				<InterviewTitleArea
					title={response.title}
					date={response.createdAt.slice(0, 10).replaceAll('-', '.')}
					accountId={response.accountId}
					toggle={toggle}
					toggleSwitch={toggleSwitch}
				/>
				{response.questions &&
					response.questions.map((item, index) => (
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
			response: response.data
    }
  };
}

export default InterviewPage;