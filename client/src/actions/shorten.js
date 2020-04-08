import axios from "axios";
import { setAlert } from "./alert";
import {
  CHANNEL_LIST,
  GET_PRIVATE_SHARE,
  SHARE_ERROR,
  LIST_EMPTY
} from "./types";

import config from "../utils/default";

// Set API URL :
axios.defaults.baseURL = config.api;

// Get posts
export const getMyShorten = type => async dispatch => {
  try {
    const res = await axios.get(`/api/shortener/me/${type}`);
    dispatch({
      type: GET_PRIVATE_SHARE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/*
| @route  /api/channel
| @desc   Get all user channel
| @access private
*/
export const getChannelList = () => async dispatch => {
  try {
    const res = await axios.get(`/api/channel`);
    dispatch({
      type: CHANNEL_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_EMPTY,
      payload: { err }
    });
  }
};

/*
| @route  /api/channel/new
| @desc   Create new user channel
| @access private
*/
export const createChannel = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/channel`, formData, config);

    dispatch({
      type: CHANNEL_LIST,
      payload: res.data
    });

    dispatch(setAlert("Channel berhasil disimpan", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LIST_EMPTY,
      payload: { err }
    });
  }
};
