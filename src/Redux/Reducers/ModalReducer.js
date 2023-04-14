const ModalState = {
  active: false,
  title: '',
  content: '',
};

// export const setToken = (token) => ({
//   type: SET_TOKEN,
//   token,
// });

// export const setUserId = (userId) => ({
//   type: SET_USERID,
//   userId,
// });

export const ModalReducer = (state = ModalState, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        active: !state.active,
        title: action.payload.title,
        content: action.payload.content
      };
    case "CLOSE":
      return {
        ...state,
        active: !state.active,
      };
    default:
      return state;
  }
};
