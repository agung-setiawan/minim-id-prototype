import { CHANNEL_LIST, LIST_EMPTY } from "../actions/types";

const initialState = {
  channels: [],
  channel: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_LIST:
      return {
        ...state,
        channels: payload,
        loading: false
      };
    case LIST_EMPTY:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
