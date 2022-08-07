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
    case DELETE_POST: {
      let arrayData = [...state.postData].filter((post) => {
        return post.id !== action.payload.id;
      });
      return {
        ...state,
        postData: arrayData,
      };
    }
    // case LIKE_POST: {
    //   let arrayData = [...state.postData];
    //   return arrayData.map((like) => {
    //     if (like.id === action.payload.PostId) {
    //       return {
    //         ...like,
    //         postData: arrayData,
    //       };
    //     }
    //   });
    // }
    // case UNLIKE_POST: {
    //   let arrayData = [...state.postData].filter((like) => {
    //     if (like.id === action.payload.PostId) {
    //       return {
    //         ...state,
    //         postData: arrayData,
    //       };
    //     }
    //   });
    // }
    case GET_LIKES:
      return {
        ...state,
        postData: action.payload,
      };
    // {
    //   let arrayData = [...state.postData];
    //   return arrayData.map((post) => {
    //     if (post.id === action.payload.id) {
    //       return {
    //         ...post,
    //         Likes: [...action.payload.Likes],
    //       };
    //     }
    //     return post;
    //   });
    // }
    default:
      return state;
  }
}
