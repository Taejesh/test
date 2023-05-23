const initialState = {
  guestToken: '',
};
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {guestToken: action.payload};

    default:
      return state;
  }
};
