import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const GET_LIKES = "GET_LIKES";

const token = JSON.parse(localStorage.getItem("token"));

export const getPostId = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/${id}`, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getAllPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/`, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
        return array;
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (id, postText, postFile) => {
  return (dispatch) => {
    let data = new FormData();
    data.append("postText", postText);
    if (typeof images === "object") {
      data.append("images", postFile);
    }
    if (postText || postFile) {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}posts/${id}`,
        data: { postText: postText, postFile: postFile },
        headers: { Authorization: "Bearer " + token.token },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: res.data });
        })
        .catch((err) => console.log(err));
    }
  };
};
export const deletePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}posts/${id}`,
      headers: { Authorization: "Bearer " + token.token },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};

export const createPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}posts/`, data, {
        headers: {
          Authorization: "Bearer " + token.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: CREATE_POST, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (id) => {
  return (dispatch) => {
    console.log(id);
    console.log(token.userId);
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}like/${id}`,
      data: { id: token.userId },
      headers: {
        Authorization: "Bearer " + token.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const unlikePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}like/${id}`,
      headers: {
        Authorization: "Bearer " + token.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { id: token.userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getLikes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}like`, {
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: GET_LIKES,
          payload: res.data,
        });
      })
      .catch((err) => err);
  };
};
