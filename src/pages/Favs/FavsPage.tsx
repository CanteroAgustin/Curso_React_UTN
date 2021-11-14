import { useContext, useEffect, useRef, useState } from "react";
import FavCardComponent from "../../components/FavCardComponent/FavCard.component";
import { Col, Row } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { StoreContext } from '../../stores/StoreProvider';
import { Character } from '../../interfaces/ListInterface';
import { ActionTypes } from '../../stores/FavReducer';

const FavsPage = () => {
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
    <>
      <Row>
        {favStore.map((element: any) => (
          <Col span={4} key={element.id}>
            <FavCardComponent character={element}></FavCardComponent>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default FavsPage;

