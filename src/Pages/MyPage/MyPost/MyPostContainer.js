import React, { useState, useEffect, useCallback } from "react";
import MyPostsView from "./MyPostView";
import bringMyPostListData from "../../api/MyPage/MyPost/bringMyPostListData";

const MyPostContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultParamValue = {
		page: 1
	}
  const limit = 15;
  const [myPostParam, setMyPostParam] = useState({...defaultParamValue});
	const [totalPages, setTotalPages] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
      bringMyPostListData(myPostParam)
        .then((result) => {console.log(result);setBoardList(result.interviews); setTotalPages(result.totalPages);  setTotalPosts(result.totalElements); setIsLoading(false)})
        .catch((resolve) => console.log(resolve))
  }, [myPostParam]);


  const isChangeCurrentPage = useCallback((value) => {
		setMyPostParam((prev) => {
			return { ...prev, page: value };
		});
	}, []);


  return (
    <MyPostsView 
      totalPages={totalPages}
      totalPosts={totalPosts}
      limit={limit}
      setPage={isChangeCurrentPage}
      myPostParam={myPostParam}
      boardList={boardList} 
      isLoading={isLoading}/>
    
    );
};

export default MyPostContainer;
