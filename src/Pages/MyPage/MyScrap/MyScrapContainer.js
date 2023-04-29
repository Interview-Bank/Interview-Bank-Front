import React, { useState, useEffect, useCallback } from "react";
import MyScrapView from "./MyScrapView";
import bringScrapListData from "../../api/MyPage/MyScrap/bringScrapListData";

const MyScrapContainer = () => {
  const [scrapList, setScrapList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultParamValue = {
		page: 1
	}
  const limit = 15;
  const [scrapParam, setScrapParam] = useState({...defaultParamValue});
	const [totalPages, setTotalPages] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
      bringScrapListData(scrapParam)
        .then((result) => {console.log(result);setScrapList(result.scraps); setTotalPages(result.totalPages);  setTotalPosts(result.totalElements); setIsLoading(false)})
        .catch((resolve) => console.log(resolve))
  }, [scrapParam]);


  const isChangeCurrentPage = useCallback((value) => {
		setScrapParam((prev) => {
			return { ...prev, page: value };
		});
	}, []);

  return (
    <MyScrapView
      totalPages={totalPages}
      totalPosts={totalPosts}
      limit={limit}
      setPage={isChangeCurrentPage}
      scrapParam={scrapParam}
      scrapList={scrapList} 
      isLoading={isLoading} />
    )
};

export default MyScrapContainer;
