import React, { useContext, useEffect, useRef } from 'react'
import { StoreContext } from '../../stores/StoreProvider';
import * as CustomService from "../../services/CustomService";
import { ActionTypes } from '../../stores/StoreReducer';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './PaginationComponent.css';
import { Pagination } from 'antd';
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

  // const changePage = (accion: string) => {
  //   let page = listState.page;
  //   if (accion === 'sumar') {
  //     page = listState.page + 1
  //   } else {
  //     page = listState.page - 1
  //   }
  //   CustomService.getPage(page)
  //     .then((data: any) => {
  //       if (isMounted.current) {
  //         data.page = page;
  //         dispatchState({ type: ActionTypes.SET_LIST, payload: data });
  //       }
  //     })
  // }

  const changePage = (p: any) => {
    let page = listState.page;
    page = p;
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
      {/* <button onClick={() => changePage('restar')}>
        <ArrowLeftOutlined color="#eb2f96" /> Anterior
      </button>
      <button onClick={() => changePage('sumar')}>
        Siguiente
        <ArrowRightOutlined color="#eb2f96" />
      </button> */}
      <Pagination defaultCurrent={1} pageSize={20} showSizeChanger={false} total={671} onChange={data => changePage(data)}></Pagination>
    </div >
  )
}

export default PaginationComponent