import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";

const token = JSON.parse(localStorage.getItem("token"));
// const id = JSON.parse(localStorage.getItem("token")).userId;

export const getOnePost = (postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/${postId}`, {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: { PostId: postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const getAllPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/`, {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then((res) => {
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, postText, postFile) => {
  return (dispatch) => {
    let data = new FormData();
    data.append("postText", postText);
    if (typeof images === "object") {
      data.append("images", postFile);
    }

    if (postText || postFile) {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
        headers: { Authorization: `Bearer ${token.token}` },
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: data });
        })
        .catch((err) => console.log(err));
    }
  };
};
export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
      headers: { Authorization: `Bearer ${token.token}` },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const createPost = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}posts/`,
      headers: { Authorization: `Bearer ${token.token}` },
      withCredentials: true,
      data,
    })
      .then((res) => {
        dispatch({ type: CREATE_POST, payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
