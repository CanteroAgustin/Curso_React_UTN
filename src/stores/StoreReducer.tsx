import { Character, CharacterList } from "../interfaces/ListInterface";

const initialState: CharacterList = { results: [{ id: 0, like: false }] };

enum ActionTypes {
  SET_LIST,
  ADD,
  RESTAR,
  SET_FAV,
  ADD_DETAIL
}

const storeReducer = (state: CharacterList, action: { type: ActionTypes; payload: Character | any }) => {
  const index = state.results?.findIndex((character: Character) => character.id === action.payload.id);
  switch (action.type) {
    case ActionTypes.SET_LIST:
      return action.payload;
    case ActionTypes.ADD:
      state.results[index].like = action.payload.like;
      return { ...state };
    case ActionTypes.ADD_DETAIL:
      state.results[index].descripcion = action.payload.descripcion;
      state.results[index].puntaje = action.payload.puntaje;
      return { ...state };
    default:
      return state;
  }
}

export { initialState, ActionTypes };
export default storeReducer;
