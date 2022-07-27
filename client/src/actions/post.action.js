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
const userId = JSON.parse(localStorage.getItem("token")).userId;

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

export const getAllPosts = (id) => {
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
      data: data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: CREATE_POST, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const likePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}like/${id}`,
      data: { UserId: userId, PostId: id },
      headers: {
        Authorization: `Bearer ${token.token}`,
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
export const unlikePost = (PostId, UserId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}like/${PostId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      data: { UserId: UserId, PostId: PostId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getLikes = (PostId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}post/${PostId}/like`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: GET_LIKES,
          payload: res.data.likes,
        });
      })
      .catch((err) => err);
  };
};
