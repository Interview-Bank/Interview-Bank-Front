import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterSelect from "../Pages/Register/RegisterSelect";
import RegisterEmailContainer from "../Pages/Register/RegisterEmail/RegisterEmailContianer";
import HomeContainer from "../Pages/Home/HomeContainer";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import FindPasswordContainer from "../Pages/FindPassword/FindPasswordContainer";
import InterviewConatiner from "../Pages/Interview/InterviewConatiner";
import PostContainer from "../Pages/Post/PostPage/PostContainer";
import MyPostsContainer from "../Pages/MyPost/MyPostsContainer";
import MyScrapContainer from "../Pages/MyScrap/MyScrapContainer";
import ScrapInterviewContainer from "../Pages/ScrapInterview/ScrapInterviewContainer";
import SearchInterviewContainer from "../Pages/Search/SearchInterviewContainer";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeContainer />} />
      <Route path="/select" element={<RegisterSelect />} />
      <Route path="/signup" element={<RegisterEmailContainer />} />
      <Route path="/find" element={<FindPasswordContainer />} />
      <Route path="/post" element={<PostContainer />} />
      <Route path="/my-posts" element={<MyPostsContainer />} />
      <Route path="/scrap" element={<MyScrapContainer />} />
      <Route path="/interview/:interview_id" element={<InterviewConatiner />} />
      <Route path="/scraps/:scrap_id" element={<ScrapInterviewContainer />} />
      <Route path="/search" element={<SearchInterviewContainer />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
