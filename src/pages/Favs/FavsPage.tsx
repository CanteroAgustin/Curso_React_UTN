import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { StoreContext } from '../../stores/StoreProvider';
import { Character } from '../../interfaces/ListInterface';
import { ActionTypes } from '../../stores/FavReducer';
import CardComponent from '../../components/CardComponent/Card.component';
import styles from './Favs.module.css'
import { useMediaQuery } from 'react-responsive';

const FavsPage = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [, setFavs] = useState<Character[]>([]);
  const isMounted = useRef(true);
  const [, , user, favStore, favDispatch] = useContext(StoreContext);
  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    getDoc(doc(db, "favs", user.uid)).then(res => {
      return res.data();
    }).then(data => {
      const temp: Character[] = [];
      data?.favs.forEach((fav: Character) => {
        if (fav.like === true) {
          temp.push(fav);
        }
      });
      setFavs(temp);
      favDispatch({ type: ActionTypes.SET_FAV_LIST, payload: temp });
    })
  }, [favDispatch, user.uid]);

  return (
    <div className={styles.container}>
      {!isTabletOrMobile ? <Row>
        {favStore.map((element: any) => (
          <Col span={4} key={element.id}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))}
      </Row>
        :
        favStore.map((element: any) => (
          <Col key={element.id}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))
      }
    </div>
  )
}

export default FavsPage;

