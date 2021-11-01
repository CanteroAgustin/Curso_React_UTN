import { useEffect, useRef, useContext } from "react";
import * as CustomService from "../../services/CustomService";
import { Character } from "../../interfaces/ListInterface";
import { StoreContext } from "../../stores/StoreProvider";
import { ActionTypes } from "../../stores/StoreReducer";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import CardComponent from "../../components/CardComponent/Card.component";
import { Col, Row } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";

const ListPage = () => {
  const [listState, dispatchState] = useContext(StoreContext);
  let page = Number(localStorage.getItem("page"));
  const isMounted = useRef(true);
  const [, , user] = useContext(StoreContext);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    const getFavs = (data: any) => {
      const favsRef = doc(db, "favs", user.uid);
      getDoc(favsRef).then(res => {
        const favs = res.data();
        favs?.favs.forEach((doc: { id: { toString: () => string; }; like: boolean | undefined; }) => {
          data.results.forEach((element: Character) => {
            if (doc.id.toString() === element.id.toString()) {
              element.like = doc.like;
            }
          });
        });
        dispatchState({ type: ActionTypes.SET_LIST, payload: data });
      })
    };
    if (!page) {
      CustomService.getCharacter()
        .then(async (data: any) => {
          if (isMounted.current) {
            if (user) {
              getFavs(data);
            } else {
              dispatchState({ type: ActionTypes.SET_LIST, payload: data });
            }

          }
        });
    } else {
      CustomService.getPage(page)
        .then(async (data: any) => {
          if (isMounted.current) {
            data.page = page;
            if (user) {
              getFavs(data);
            } else {
              dispatchState({ type: ActionTypes.SET_LIST, payload: data });
            }
          }
        })
    }
  }, [dispatchState, listState.page, page, user]);

  return (
    <>
      <PaginationComponent></PaginationComponent>
      <Row>
        {listState.results?.map((element: Character) => (
          <Col span={4} key={element.id}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ListPage;

