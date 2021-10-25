import { Character, CharacterList } from "../interfaces/ListInterface";

const initialState: CharacterList = { results: [{ id: 0, likes: 0, dislikes: 0 }] };

enum ActionTypes {
  SET_LIST,
  ADD,
  RESTAR
}

const storeReducer = (state: CharacterList, action: { type: ActionTypes; payload: Character | any }) => {
  const index = state.results?.findIndex((character: Character) => character.id === action.payload.id);
  switch (action.type) {
    case ActionTypes.SET_LIST:
      return action.payload;
    case ActionTypes.ADD:
      if (!state.results[index].likes) {
        state.results[index].likes = 0;
      }
      console.log(state.results[index].likes, action.payload.cantidad);
      state.results[index].likes = state.results[index].likes + action.payload.cantidad;
      console.log(state.results[index].likes);
      return { ...state };
    case ActionTypes.RESTAR:
      if (!state.results[index].dislikes) {
        state.results[index].dislikes = 0;
      }
      state.results[index].dislikes++;
      return { ...state };
    default:
      return state;
  }
}

export { initialState, ActionTypes };
export default storeReducer;
