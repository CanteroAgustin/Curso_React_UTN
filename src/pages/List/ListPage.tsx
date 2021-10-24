import { useEffect, useRef, useReducer } from "react";
import * as CustomService from "../../services/CustomService";
import { Character, CharacterList } from "../../interfaces/ListInterface";
import { Link } from 'react-router-dom'

const initialState: CharacterList = { results: [{ id: 0, likes: 0, dislikes: 0 }] };

enum ActionTypes {
  SET_LIST,
  ADD,
  RESTAR,
  RESET
}

const exampleReducer = (state: CharacterList, action: { type: ActionTypes; payload: Character | any }) => {
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
    case ActionTypes.RESET:
      state.results[index].likes = 0;
      state.results[index].dislikes = 0;
      return { ...state };
    default:
      return state;
  }
}

const ListPage = () => {
  const [listState, dispatchState] = useReducer(exampleReducer, initialState);

  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    CustomService.getCharacter()
      .then((data: any) => {
        if (isMounted.current) {
          //De esta forma podemos generar el memory leak 
          //al solicitar el servicio y desmontar el componente 
          //antes de que se cambie el estado

          //setTimeout(() => {
          //setTickers(data);
          //}, 3000);
          data.page = 1;
          dispatchState({ type: ActionTypes.SET_LIST, payload: data });
        } else {
          //console.log("Ya no estoy en el DOM");
        }
      });
  }, []);

  const incrementarLikes = (id: number, cantidad: number) => {
    //incrementar y modificar el estado
    dispatchState({ type: ActionTypes.ADD, payload: { cantidad: cantidad, id: id } });
  }

  const decrementarLikes = (id: number) => {
    //decrementar y modificar el estado
    dispatchState({ type: ActionTypes.RESTAR, payload: { cantidad: 1, id: id } });
  }

  const resetLikes = (id: number) => {
    dispatchState({ type: ActionTypes.RESET, payload: { id: id } });
  }

  const changePage = (accion: string) => {
    let page = listState.page;
    if (accion === 'sumar') {
      page = listState.page + 1
    } else {
      page = listState.page - 1
    }
    CustomService.getPage(page)
      .then((data: any) => {
        if (isMounted.current) {
          data.page = page;
          dispatchState({ type: ActionTypes.SET_LIST, payload: data });
        }
      })
  }

  return (
    <>
      <button onClick={() => changePage('restar')}>Anterior</button>
      <button onClick={() => changePage('sumar')}>Siguiente</button>
      <ul>
        {listState.results?.map((element: Character) => (
          <li key={element.id} className="coin-list-element">
            {element.name}
            <br />
            <button onClick={() => incrementarLikes(element.id, 2)}> {element.likes} +1 Likes</button>
            <button onClick={() => decrementarLikes(element.id)}> {element.dislikes} -1 Dislikes</button>
            <button onClick={() => resetLikes(element.id)}> RESET </button>

            <Link to={`/list/${element.id}`}>
              Ver Más
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListPage;
