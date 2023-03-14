import React, { useState, useEffect } from "react";
import HeaderView from "./HeaderView";
import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";

const HeaderContainer = () => {
  const [modal, setModal] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState(false)
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return <HeaderView modal={modal} setModal={setModal} profile = {profile} setProfile={setProfile} isAuth={isAuth}/>;
};

export default HeaderContainer;
