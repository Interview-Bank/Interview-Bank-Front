import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import RegisterEmail from "./pages/RegisterEmail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/register-email" element={<RegisterEmail />} />
    </Routes>
  );
};

export default Router;
