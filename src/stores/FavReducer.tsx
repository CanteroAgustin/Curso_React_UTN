import { Character } from "../interfaces/ListInterface";

const favInitialState: Character[] = [{ id: 0, like: false }];

enum ActionTypes {
  SET_FAV_LIST,
}

const favReducer = (state: Character[], action: { type: ActionTypes; payload: Character | any }) => {
  switch (action.type) {
    case ActionTypes.SET_FAV_LIST:
      return action.payload;
    default:
      return state;
  }
}

export { favInitialState, ActionTypes };
export default favReducer;
