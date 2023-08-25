import { SeoHead } from '@/components/atoms/SeoHead';
import { MyPageBody } from '@/components/molecules/MyPage/MyPageBody';
import { MyPageSide } from '@/components/molecules/MyPage/MyPageSide';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { bringMyPostListData, bringMyScrapListData } from '../api/MyPage/myPost';
import { MyPageSetting } from '@/components/molecules/MyPage/MyPageSetting';

type Props = {}

const MyPage = (props: Props) => {
  const router = useRouter();
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRouter, setCurrentRouter] = useState('');

  const defaultParamValue = {
    page: 1
  }
  const limit = 15;
  const [myPostParam, setMyPostParam] = useState({ ...defaultParamValue });
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (router.query.my === 'my-post') {
      setMyPostParam({ ...defaultParamValue });
      bringMyPostListData(myPostParam)
        .then((response) => { setBoardList(response.interviews); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }
    if (router.query.my === 'my-scrap') {
      setMyPostParam({ ...defaultParamValue });
      bringMyScrapListData(myPostParam)
        .then((response) => { setBoardList(response.interviews); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }
  }, []);

  useEffect(() => {
    // router.query.my &&
    setCurrentRouter(`${router.query.my}`);
    if (router.query.my === 'my-post') {
      if (currentRouter !== 'my-post' && myPostParam.page !== 1) {
        // setCurrentRouter(router.query.my);
        setMyPostParam({ ...defaultParamValue });
      }
      bringMyPostListData(myPostParam)
        .then((response) => { setBoardList(response.interviews); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }

    if (router.query.my === 'my-scrap') {
      if (currentRouter !== 'my-scrap' && myPostParam.page !== 1) {
        // setCurrentRouter(router.query.my);
        setMyPostParam({ ...defaultParamValue });
      }
      bringMyScrapListData(myPostParam)
        .then((response) => { setBoardList(response.scraps); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }
  }, [router.query.my, myPostParam]);

  const isChangeCurrentPage = useCallback((value: number) => {
		setMyPostParam((prev) => {
			return { ...prev, page: value };
		});
  }, []);
  
  return (
    <section className='mypage'>
      <SeoHead title='내 정보 관리' />
      <MyPageSide />
      {(router.query.my === 'my-post' || router.query.my === 'my-scrap')
        ?
          <MyPageBody
            totalPages  ={totalPages}
            totalPosts={totalPosts}
            limit={limit}
            setPage={isChangeCurrentPage}
            myPostParam={myPostParam}
            boardList={boardList} 
            isLoading={isLoading}
            type={router.query.my === 'my-scrap' ? 'scraps' : 'interview'}
          />
        : 
          <MyPageSetting />
      }
    </section>
  )
}

export default MyPage;