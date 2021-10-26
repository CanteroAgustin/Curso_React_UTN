import { useEffect, useRef, useContext } from "react";
import * as CustomService from "../../services/CustomService";
import { Character } from "../../interfaces/ListInterface";
import { StoreContext } from "../../stores/StoreProvider";
import { ActionTypes } from "../../stores/StoreReducer";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Row } from "antd";
import WithHeader from "../../hocs/WithHeader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";

const ListPage = () => {
  const [listState, dispatchState] = useContext(StoreContext);

  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    if (!listState.page) {
      CustomService.getCharacter()
        .then(async (data: any) => {
          if (isMounted.current) {
            //De esta forma podemos generar el memory leak 
            //al solicitar el servicio y desmontar el componente 
            //antes de que se cambie el estado

            //setTimeout(() => {
            //setTickers(data);
            //}, 3000);
            const docRef = doc(db, "base", "datos");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              data.page = docSnap.data().page;
            } else {
              data.page = 1;
            }

            dispatchState({ type: ActionTypes.SET_LIST, payload: data });
          } else {
            //console.log("Ya no estoy en el DOM");
          }
        });
    }

  }, [dispatchState, listState.page]);

  const like = (id: number, cantidad: number) => {
    //incrementar y modificar el estado
    dispatchState({ type: ActionTypes.ADD, payload: { cantidad: cantidad, id: id } });
  }

  const dislike = (id: number) => {
    //decrementar y modificar el estado
    dispatchState({ type: ActionTypes.RESTAR, payload: { cantidad: 1, id: id } });
  }
  return (
    <WithHeader>
      <PaginationComponent></PaginationComponent>
      <Row>
        {listState.results?.map((element: Character) => (
          <Col span={4}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))}
      </Row>
    </WithHeader>
  )
}

export default ListPage;
