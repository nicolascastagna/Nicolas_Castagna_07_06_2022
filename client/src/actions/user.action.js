import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

const id = JSON.parse(localStorage.getItem("token")).userId;
const token = JSON.parse(localStorage.getItem("token")).token;

export const getUser = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}profil/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (picture) => {
  const data = new FormData();
  data.append("userId", token.userId);
  if (typeof images === "object") {
    data.append("images", picture);
  }
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
        withCredentials: true,
        data: { ...data },
      })
      .then((res) => {
        dispatch({ type: UPLOAD_PICTURE, payload: res.data.userPicture });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (firstName, lastName, email) => {
  return (dispatch) => {
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    return axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}profil/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
      withCredentials: true,
      data: { ...data },
    })
      .then((res) => dispatch({ type: UPDATE_USER, payload: data }))
      .catch((err) => console.log(err));
  };
};

export const deleteUser = () => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}profil/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
