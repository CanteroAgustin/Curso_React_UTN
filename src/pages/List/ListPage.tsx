import { useEffect, useRef, useContext, useState } from "react";
import * as CustomService from "../../services/CustomService";
import { Character } from "../../interfaces/ListInterface";
import { StoreContext } from "../../stores/StoreProvider";
import { ActionTypes } from "../../stores/StoreReducer";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import CardComponent from "../../components/CardComponent/Card.component";
import { Col, Row } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { useMediaQuery } from 'react-responsive';
import styles from "../List/ListPage.module.css";
import { Spin } from 'antd';

const ListPage = () => {
  const [listState, dispatchState] = useContext(StoreContext);
  let page = Number(localStorage.getItem("page"));
  const isMounted = useRef(true);
  const [, , user] = useContext(StoreContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    const getFavs = (data: any) => {
      setLoading(true);
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
        setLoading(false);
      })
    };
    if (!page) {
      setLoading(true);
      CustomService.getCharacter()
        .then(async (data: any) => {
          if (isMounted.current) {
            if (user) {
              getFavs(data);
            } else {
              dispatchState({ type: ActionTypes.SET_LIST, payload: data });
            }
          }
          setLoading(false);
        });
    } else {
      setLoading(true);
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
          setLoading(false);
        })
    }
  }, [dispatchState, listState.page, page, setLoading, user]);

  return (
    <div className={styles.container}>
      <PaginationComponent></PaginationComponent>
      {loading && <Spin />}
      {(!isTabletOrMobile && !loading) && <Row>
        {listState.results?.map((element: Character) => (
          <Col span={4} key={element.id}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))}
      </Row>}
      {(isTabletOrMobile && !loading) && <div>
        {listState.results?.map((element: Character) => (
          <CardComponent character={element}></CardComponent>
        ))}
      </div>}
    </div>
  )
}

export default ListPage;

