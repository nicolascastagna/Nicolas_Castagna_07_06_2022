import { GET_USERS } from "../actions/users.action";

const initalState = {
  dataAllUsers: [],
};

export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        dataAllUsers: action.payload,
      };
    default:
      return state;
  }
}
