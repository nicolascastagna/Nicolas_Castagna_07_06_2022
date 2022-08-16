// Regroupe tous les reducers
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPosts.reducer";

export default combineReducers({
  userReducer,
  postReducer,
  allPostsReducer,
});
