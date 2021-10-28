import React, { useContext, useEffect, useRef } from 'react'
import { Character } from '../../interfaces/ListInterface';
import { Card } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Card.module.css';
import { StoreContext } from '../../stores/StoreProvider';
import { ActionTypes } from '../../stores/StoreReducer';

const { Meta } = Card;

interface Props {
  character: Character
}

function CardComponent({ character }: Props) {

  const isMounted = useRef(true);
  const [listState, dispatchState] = useContext(StoreContext);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  const like = (character: Character) => {
    //incrementar y modificar el estado
    dispatchState({ type: ActionTypes.ADD, payload: { id: character.id, like: character.like ? !character.like : true } });
  }

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, borderRadius: 10, marginLeft: 30, marginBottom: 20 }}
      cover={<img alt="example" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={character.image} />}
      actions={[
        !character.like ?
          <StarOutlined style={{ fontSize: 24, color: '#FFD700' }} key="startOutLined" onClick={() => like(character)}></StarOutlined> :
          <StarFilled style={{ fontSize: 24, color: '#FFD700' }} key="startFilled" onClick={() => like(character)}></StarFilled>
      ]}
      bodyStyle={{ padding: 0 }}
    >
      <Meta title={character.name} style={{ textAlign: 'center', padding: 10 }} />
    </Card>

  )
}

export default CardComponent