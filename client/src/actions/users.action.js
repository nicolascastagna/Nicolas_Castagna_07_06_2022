import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}profil/`, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
