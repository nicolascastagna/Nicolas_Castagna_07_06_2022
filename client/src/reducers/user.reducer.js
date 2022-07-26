import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/user.action";

// Stockage data dans le State
const initalState = {
  dataUser: [],
};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      // Incrèmente la data de GET_USER à initialState
      return {
        ...state,
        dataUser: action.payload,
      };
    case UPLOAD_PICTURE:
      return {
        ...state,
        dataUser: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    default:
      return state;
  }
}
