import {
  GET_PRIVATE_SHARE,
  GET_PUBLIC_SHARE,
  SHARE_ERROR
} from "../actions/types";

const initialState = {
  shorteners: [],
  shorten: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRIVATE_SHARE:
      return {
        ...state,
        shorteners: payload,
        loading: false
      };
    case GET_PUBLIC_SHARE:
      return {
        ...state,
        shorteners: payload,
        loading: false
      };
    case SHARE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
