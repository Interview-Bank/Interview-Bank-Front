import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterSelect from "../Pages/Register/RegisterSelect";
import RegisterEmailContainer from "../Pages/Register/RegisterEmail/RegisterEmailContianer";
import HomeContainer from "../Pages/Home/HomeContainer";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import FindPasswordContainer from "../Pages/FindPassword/FindPasswordContainer";
import InterviewConatiner from "../Pages/Interview/InterviewConatiner";
import PostContainer from "../Pages/Post/PostPage/PostContainer";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeContainer />} />
      <Route path="/select" element={<RegisterSelect />} />
      <Route path="/signup" element={<RegisterEmailContainer />} />
      <Route path="/find" element={<FindPasswordContainer />} />
      <Route path="/post" element={<PostContainer />} />
      <Route path="/interview/:interview_id" element={<InterviewConatiner />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
