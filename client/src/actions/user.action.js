import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

const token = JSON.parse(localStorage.getItem("token"));

export const getUser = () => {
  const userId = JSON.parse(localStorage.getItem("token")).userId;
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}profil/${userId}`, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  // const data = new FormData();
  // data.append("userId", token.userId);
  // if (typeof images === "object") {
  //   data.append("images", picture);
  // }
  return (dispatch) => {
    console.log(data);
    console.log({ id });
    return axios
      .put(`${process.env.REACT_APP_API_URL}profil/${id}`, data, {
        headers: { Authorization: "Bearer " + token.token },
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: UPLOAD_PICTURE, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (id, firstName, lastName, email) => {
  return (dispatch) => {
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    return axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}profil/${id}`,
      headers: { Authorization: "Bearer " + token.token },
      "Content-Type": "application/json",
      withCredentials: true,
      data: { ...data },
    })
      .then((res) => dispatch({ type: UPDATE_USER, payload: data }))
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}profil/${id}`, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
