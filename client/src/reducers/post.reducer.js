import {
  CREATE_POST,
  DELETE_POST,
  GET_LIKES,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.action";

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
      let arrayData = [...state.postData];
      return arrayData.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            postText: action.payload.postText,
          };
        } else return post;
      });
    case CREATE_POST:
      return {
        ...state,
        postData: action.payload,
      };
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.PostId);
    // case LIKE_POST:
    //   let postDataLikes = [...state.postData];
    //   return postDataLikes.map((post) => {
    //     if (post.id === action.payload.id) {
    //       return {
    //         ...state,
    //         postData: postDataLikes,
    //       };
    //     }
    //     return post;
    //   });
    // case UNLIKE_POST:
    //   let postDataUnlike = [...state.postData];
    //   return postDataUnlike.map((post) => {
    //     if (post.id === action.payload.id) {
    //       return {
    //         ...state,
    //         postData: postDataLikes,
    //       };
    //     }
    //     return post;
    //   });
    case GET_LIKES:
      // Récupère la liste des likes de la publication.
      return state.map((post) => {
        action.payload.forEach((like) => {
          return like;
        });
        return post;
      });
    default:
      return state;
  }
}
