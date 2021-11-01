import { useContext, useEffect, useRef } from 'react'
import { Character } from '../../interfaces/ListInterface';
import { Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Card.module.css';
import { StoreContext } from '../../stores/StoreProvider';
import { ActionTypes } from '../../stores/StoreReducer';
import { doc, setDoc, collection, getDoc, query, getDocs, where, DocumentData } from "firebase/firestore";
import { db } from '../../services/Firebase';

const { Meta } = Card;

interface Props {
  character: Character
}

function CardComponent({ character }: Props) {

  const isMounted = useRef(true);
  const [listState, dispatchState] = useContext(StoreContext);
  const [, , user] = useContext(StoreContext);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  const like = async (character: Character) => {
    const favsRef = doc(db, "favs", user.uid);
    //const q = query(favsRef, where("like", "==", true));
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

    // if (character.like) {
    //   await setDoc(doc(db, "favs", user.uid),
    //     {
    //       favs: [...data]
    //     }
    //   );
    // } else {
    //   await setDoc(doc(db, "favs", user.uid), {
    //     favs: [{
    //       ...character,
    //       like: true
    //     }]
    //   });
    // }

    dispatchState({ type: ActionTypes.ADD, payload: { id: character.id, like: character.like ? !character.like : true } });
  }

  const showFavs = () => {
    if (user && !character.like) {
      return <StarOutlined style={{ fontSize: 24, color: '#FFD700' }} key="startOutLined" onClick={() => like(character)}></StarOutlined>;
    } else if (user && character.like) {
      return <StarFilled style={{ fontSize: 24, color: '#FFD700' }} key="startFilled" onClick={() => like(character)}></StarFilled>
    }
  }

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, borderRadius: 10, marginLeft: 30, marginBottom: 20 }}
      cover={<img alt="example" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={character.image} />}
      actions={[showFavs()]}
      bodyStyle={{ padding: 0 }}
    >
      <Meta title={character.name} style={{ textAlign: 'center', padding: 10 }} />
    </Card>

  )
}

export default CardComponent