import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterSelect from "../Pages/Register/RegisterSelect";
import RegisterEmailContainer from "../Pages/Register/RegisterEmail/RegisterEmailContianer";
import HomePage from "../Pages/Home/HomePage";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import FindPasswordContainer from "../Pages/FindPassword/FindPasswordContainer";
import InterviewConatiner from "../Pages/Interview/InterviewConatiner";
import PostPage from "../Pages/Post/PostPage/PostPage";
import MyPostsContainer from "../Pages/MyPost/MyPostsContainer";
import MyScrapContainer from "../Pages/MyScrap/MyScrapContainer";
import ScrapInterviewContainer from "../Pages/ScrapInterview/ScrapInterviewContainer";
import SearchPage from "../Pages/Search/SearchPage";
import GoogleSocialLogin from "../Pages/SocialLogin/GoogleSocialLogin";
import NaverSocialLogin from "../Pages/SocialLogin/NaverSocialLogin";
import KakaoSocialLogin from "../Pages/SocialLogin/KakaoSocialLogin";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/select" element={<RegisterSelect />} />
      <Route path="/signup" element={<RegisterEmailContainer />} />
      <Route path="/find" element={<FindPasswordContainer />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/my-posts" element={<MyPostsContainer />} />
      <Route path="/scrap" element={<MyScrapContainer />} />
      <Route path="/interview/:interview_id" element={<InterviewConatiner />} />
      <Route path="/scraps/:scrap_id" element={<ScrapInterviewContainer />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/oauth2/google/redirect" element={<GoogleSocialLogin/>}/>
      <Route path="/oauth2/naver/redirect" element={<NaverSocialLogin/>}/>
      <Route path="/oauth2/kakao/redirect" element={<KakaoSocialLogin/>}/>

    </Routes>
  );
};

export default Router;
