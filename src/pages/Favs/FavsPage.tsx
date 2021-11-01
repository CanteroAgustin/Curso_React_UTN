import { useEffect, useRef, useState } from "react";
import CardComponent from "../../components/CardComponent/Card.component";
import { Col, Row } from "antd";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/Firebase";

const FavsPage = () => {
  const [favs, setFavs] = useState<DocumentData[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  useEffect(() => {
    const favsRef = collection(db, "favs");
    const q = query(favsRef, where("like", "==", true));
    getDocs(q).then(docs => {
      docs.forEach(element => {
        const data = element.data();
        favs.push(data)
        setFavs(favs);

        console.log(favs);
      });
    });
  }, []);

  return (
    <>
      <Row>
        {favs.map((element: any) => (
          <Col span={4} key={element.id}>
            <CardComponent character={element}></CardComponent>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default FavsPage;

