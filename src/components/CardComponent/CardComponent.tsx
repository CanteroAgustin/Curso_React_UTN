import React, { useContext, useEffect, useRef } from 'react'
import { StoreContext } from '../../stores/StoreProvider';
import { Character } from '../../interfaces/ListInterface';
import { Card } from 'antd';
import './CardComponent.css';
const { Meta } = Card;

interface Props {
  character: Character
}

function CardComponent({ character }: Props) {

  const [listState, dispatchState] = useContext(StoreContext);
  const isMounted = useRef(true);

  useEffect(() => {
    return (() => {
      isMounted.current = false;
    })
  }, [])

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, borderRadius: 10, marginLeft: 30, marginBottom: 20 }}
      cover={<img alt="example" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={character.image} />}
    >
      <Meta title={character.name} style={{ textAlign: 'center' }} />
    </Card>

  )
}

export default CardComponent