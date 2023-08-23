import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/userConstant";


export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isloading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      console.log("payload",action.payload)
      return {
        ...state,
        isloading: false,
        isAuthenticated: true,
        user:action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
