import { useContext, useEffect, useRef } from 'react'
import { StoreContext } from '../../stores/StoreProvider';
import * as CustomService from "../../services/CustomService";
import { ActionTypes } from '../../stores/StoreReducer';
import styles from './Pagination.module.css';
import { Pagination } from 'antd';
import { useMediaQuery } from 'react-responsive';

function PaginationComponent() {

  const [listState, dispatchState] = useContext(StoreContext);
  const isMounted = useRef(true);
  let page = Number(localStorage.getItem("page"));
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  const changePage = async (page: number) => {
    localStorage.setItem("page", page.toString())
    CustomService.getPage(page)
      .then((data: any) => {
        if (isMounted.current) {
          data.page = page;
          dispatchState({ type: ActionTypes.SET_LIST, payload: data });
        }
      })
  }

  return (
    <div className={styles.container}>
      {isTabletOrMobile ? <Pagination simple defaultCurrent={1} current={listState.page ? listState.page : page} pageSize={20} showSizeChanger={false} total={671} onChange={data => changePage(data)}></Pagination>
        : <Pagination defaultCurrent={1} current={listState.page ? listState.page : page} pageSize={20} showSizeChanger={false} total={671} onChange={data => changePage(data)}></Pagination>}
    </div >
  )
}

export default PaginationComponent