import { SeoHead } from '@/components/atoms/SeoHead';
import { MyPageBody } from '@/components/molecules/MyPage/MyPageBody';
import { MyPageSide } from '@/components/molecules/MyPage/MyPageSide';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { bringMyPostListData, bringMyScrapListData } from '../api/MyPage/myPost';

type Props = {}

const MyPage = (props: Props) => {
  const router = useRouter();
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    if (router.query.my === 'my-post') {
      if (router.query.my !== 'my-post' && myPostParam.page !== 1) {
        setMyPostParam({ ...defaultParamValue });
      }
      bringMyPostListData(myPostParam)
        .then((response) => { setBoardList(response.interviews); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }

    if (router.query.my === 'my-scrap') {
      if (router.query.my !== 'my-scrap' && myPostParam.page !== 1) {
        setMyPostParam({ ...defaultParamValue });
      }
      bringMyScrapListData(myPostParam)
        .then((response) => { console.log(response); setBoardList(response.scraps); setTotalPages(response.totalPages); setTotalPosts(response.totalElements); setIsLoading(false) })
    }
  }, [router.query.my, myPostParam]);

  const isChangeCurrentPage = useCallback((value) => {
    console.log(value);
		setMyPostParam((prev) => {
			return { ...prev, page: value };
		});
  }, []);
  
  return (
    <section className='mypage'>
      <SeoHead title='내 정보 관리' />
      <MyPageSide />
      <MyPageBody
        totalPages={totalPages}
        totalPosts={totalPosts}
        limit={limit}
        setPage={isChangeCurrentPage}
        myPostParam={myPostParam}
        boardList={boardList} 
        isLoading={isLoading}
      />
    </section>
  )
}

export default MyPage;