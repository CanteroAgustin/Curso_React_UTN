import React, { useContext, useEffect, useRef } from 'react'
import { StoreContext } from '../../stores/StoreProvider';
import * as CustomService from "../../services/CustomService";
import { ActionTypes } from '../../stores/StoreReducer';
import './PaginationComponent.css';
import { Pagination } from 'antd';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from '../../services/Firebase';

interface Props {

}

function PaginationComponent(props: Props) {

  const [listState, dispatchState] = useContext(StoreContext);
  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  const changePage = async (p: any) => {
    let page = listState.page;
    page = p;
    const docData = {
      page
    };
    await setDoc(doc(db, "base", "datos"), docData);
    CustomService.getPage(page)
      .then((data: any) => {
        if (isMounted.current) {
          data.page = page;
          dispatchState({ type: ActionTypes.SET_LIST, payload: data });
        }
      })
  }

  return (
    <div className="container">
      <Pagination defaultCurrent={1} current={listState.page} pageSize={20} showSizeChanger={false} total={671} onChange={data => changePage(data)}></Pagination>
    </div >
  )
}

export default PaginationComponent