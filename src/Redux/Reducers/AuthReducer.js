const SET_TOKEN = "set_token";
const SET_USERID = "set_userId";

const AuthInitialState = {
  token: null,
  userId: null,
};

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserId = (userId) => ({
  type: SET_USERID,
  userId,
});

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
    default:
      return state;
  }
};
