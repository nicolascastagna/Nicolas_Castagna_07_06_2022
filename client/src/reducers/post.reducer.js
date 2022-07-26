import { GET_POSTS } from "../actions/post.action";

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
    default:
      return state;
  }
}
