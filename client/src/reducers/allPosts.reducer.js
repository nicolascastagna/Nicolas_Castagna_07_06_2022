import { GET_ALL_POSTS } from "../actions/post.action";

const initialState = {
  allPostsData: [],
};

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        allPostsData: action.payload,
      };
    default:
      return state;
  }
}
