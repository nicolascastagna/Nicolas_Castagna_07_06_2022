import axios from "axios";

export const GET_USERS = "GET_USERS";

const id = JSON.parse(localStorage.getItem("token")).userId;
const token = JSON.parse(localStorage.getItem("token")).token;

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}profil/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
