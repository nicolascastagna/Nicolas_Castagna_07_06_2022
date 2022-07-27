import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post.action";

const initialState = {
  postData: [],
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        postData: action.payload,
      };
    case UPDATE_POST:
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            postText: action.payload.postText,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.postId !== action.payload.postId);
    default:
      return state;
  }
}
