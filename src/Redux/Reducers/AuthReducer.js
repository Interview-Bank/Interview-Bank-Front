const SET_TOKEN = "set_token";
const SET_USERID = "set_userId";
const SET_TOKENTIME = "set_tokenExpiration";

const AuthInitialState = {
  token: null,
  userId: null,
  tokenExpiration: null,
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};

export const getToken = (state) => {
  const token = state.Auth.token;
  const expirationTime = state.Auth.tokenExpiration;
  if (!token || !expirationTime) return null;
  if (new Date().getTime() > +expirationTime) {
    localStorage.clear();
    return null;
  }
  return token;
};

export const setUserId = (userId) => ({
  type: SET_USERID,
  userId,
});

export const setTokenExpiration = (nowTime) => {
  const expirationTime = nowTime + 60 * 60 * 1000;

  return {
    type: SET_TOKENTIME,
    expirationTime,
  };
};

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_USERID:
      return {
        ...state,
        userId: action.userId,
      };

    case SET_TOKENTIME:
      return {
        ...state,
        tokenExpiration: action.expirationTime,
      };
    default:
      return state;
  }
};
