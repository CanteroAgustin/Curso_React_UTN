import { useContext, useEffect, useRef, useState } from "react";
import FavCardComponent from "../../components/FavCardComponent/FavCard.component";
import { Col, Row } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { StoreContext } from '../../stores/StoreProvider';
import { Character } from '../../interfaces/ListInterface';

const FavsPage = () => {
  const [favs, setFavs] = useState<Character[]>([]);
  const isMounted = useRef(true);
  const [, , user] = useContext(StoreContext);

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
    })
  }, [user.uid]);

  return (
    <>
      <Row>
        {favs.map((element: any) => (
          <Col span={4} key={element.id}>
            <FavCardComponent character={element}></FavCardComponent>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default FavsPage;

