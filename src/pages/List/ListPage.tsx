import { useEffect, useRef, useContext } from "react";
import * as CustomService from "../../services/CustomService";
import { Character } from "../../interfaces/ListInterface";
import { StoreContext } from "../../stores/StoreProvider";
import { ActionTypes } from "../../stores/StoreReducer";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import CardComponent from "../../components/CardComponent/Card.component";
import { Col, Row } from "antd";

const ListPage = () => {
  const [listState, dispatchState] = useContext(StoreContext);
  let page = Number(localStorage.getItem("page"));
  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    if (!page) {
      CustomService.getCharacter()
        .then(async (data: any) => {
          if (isMounted.current) {
            dispatchState({ type: ActionTypes.SET_LIST, payload: data });
          }
        });
    } else {
      CustomService.getPage(page)
        .then((data: any) => {
          if (isMounted.current) {
            data.page = page;
            dispatchState({ type: ActionTypes.SET_LIST, payload: data });
          }
        })
    }
  }, [dispatchState, listState.page, page]);

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
