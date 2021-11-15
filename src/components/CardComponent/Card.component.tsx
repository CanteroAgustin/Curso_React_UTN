import { useContext, useEffect, useRef, useState } from 'react'
import { Character } from '../../interfaces/ListInterface';
import { Card, Spin } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Card.module.css';
import { StoreContext } from '../../stores/StoreProvider';
import { ActionTypes as FavActionTypes } from '../../stores/FavReducer';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../services/Firebase';
import styles from './Card.module.css'
import { useHistory } from 'react-router-dom';
import { ActionTypes } from '../../stores/StoreReducer';

const { Meta } = Card;

interface Props {
  character: Character
}

function CardComponent({ character }: Props) {

  const isMounted = useRef(true);
  const [, dispatchState, user, , favDispatch] = useContext(StoreContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  const like = async (character: Character) => {
    setLoading(true);
    const favsRef = doc(db, "favs", user.uid);
    const document = await (await getDoc(favsRef)).data();
    if (document) {
      let encontrado = false;
      document.favs.forEach((fav: { id: number; like: boolean; }) => {
        if (fav.id === character.id) {
          fav.like = !character.like;
          setDoc(doc(db, "favs", user.uid),
            {
              favs: [...document.favs]
            }
          );
          encontrado = true;
        }
      });
      if (!encontrado) {
        document.favs.push({ ...character, like: !character.like });
        await setDoc(doc(db, "favs", user.uid),
          {
            favs: [...document.favs]
          }
        );
      }
    } else {
      await setDoc(doc(db, "favs", user.uid),
        {
          favs: [{ ...character, like: true }]
        }
      );
    }
    const newDocument = await (await getDoc(favsRef)).data();
    if (newDocument) {
      const docFiltered = newDocument.favs.filter((data: Character) => {
        return data.like === true;
      });
      favDispatch({ type: FavActionTypes.SET_FAV_LIST, payload: docFiltered });
    }
    dispatchState({ type: ActionTypes.ADD, payload: { id: character.id, like: character.like ? !character.like : true } });
    setLoading(false);
  }

  const showFavs = () => {
    if (user && !character.like) {
      return <StarOutlined style={{ fontSize: 24, color: '#FFD700' }} key="startOutLined" onClick={() => like(character)}></StarOutlined>;
    } else if (user && character.like) {
      return <StarFilled style={{ fontSize: 24, color: '#FFD700' }} key="startFilled" onClick={() => like(character)}></StarFilled>
    }
  }

  return (
    <>
      {loading ? <Spin /> : <Card
        bordered
        className={styles.card}
        cover={
          <img
            onClick={() => history.push(`/list/${character.id}`)}
            alt="example"
            className={styles.img}
            src={character.image} />
        }
        actions={[showFavs()]}
        bodyStyle={{ padding: 0 }}>
        <Meta title={character.name} style={{ textAlign: 'center', padding: 10 }} />
      </Card >}
    </>
  )
}

export default CardComponent