import { EditOutlined } from '@ant-design/icons';
import { Col, Divider, Rate } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../../interfaces/ListInterface";
import * as CustomService from "../../services/CustomService";
import { Form, Input, Button } from 'antd';
import styles from './DetailPage.module.css';
import { StoreContext } from '../../stores/StoreProvider';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../services/Firebase';
import { ActionTypes } from '../../stores/StoreReducer';
import { Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';

const DetailPage = () => {
  const { id }: { id: string } = useParams();
  const [detail, setDetail] = useState<Character>();
  const [edit, setEdit] = useState(false);
  const [, dispatchState, user] = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const offset = isTabletOrMobile ? 0 : 4;

  useEffect(() => {
    setLoading(true);
    CustomService.getSpecificCharacter(id)
      .then(async (data: any) => {
        if (user) {
          const favsRef = doc(db, "favs", user.uid);
          const document = await (await getDoc(favsRef)).data();
          if (document) {
            document.favs.forEach((fav: Character) => {
              if (fav.id.toString() === id.toString()) {
                setDetail({ ...data, ...fav });
              }
            });
          } else {
            setDetail(data);
          }
        } else {
          setDetail(data);
        }
        setLoading(false);
      }).catch(err => {
        setDetail(undefined);
        setLoading(false);
      })
  }, [id, user])

  const onFinish = async (data: any) => {
    setLoading(true);
    const favsRef = doc(db, "favs", user.uid);
    const document = await (await getDoc(favsRef)).data();
    if (document) {
      let encontrado = false;
      document.favs.forEach((fav: Character) => {
        if (fav.id === detail?.id) {
          fav.puntaje = data.puntaje;
          fav.descripcion = data.descripcion;
          setDoc(doc(db, "favs", user.uid),
            {
              favs: [...document.favs]
            }
          );
          encontrado = true;
        }
      });
      if (!encontrado) {
        document.favs.push({ ...detail, puntaje: data.puntaje, descripcion: data.descripcion });
        await setDoc(doc(db, "favs", user.uid),
          {
            favs: [...document.favs]
          }
        );
      }
    } else {
      await setDoc(doc(db, "favs", user.uid),
        {
          favs: [{ ...detail, puntaje: data.puntaje, descripcion: data.descripcion }]
        }
      );
    }
    setEdit(false);
    setDetail({ ...detail, ...data });
    dispatchState({ type: ActionTypes.ADD_DETAIL, payload: { id: detail?.id, puntaje: data.puntaje, descripcion: data.descripcion } });
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      {loading ? <Spin /> :
        <div>
          <Col>
            <img
              className={styles.img}
              alt="imagen"
              src={detail?.image}
            />
          </Col>
          <Col className={styles.col2}>
            <h2>Información</h2>
            <p><strong>Nombre:</strong> {detail?.name}</p>
            <p><strong>Creación:</strong> {detail?.created}</p>
            <p><strong>Genero:</strong> {detail?.gender}</p>
            <p><strong>Origen:</strong> {detail?.origin?.name}</p>
            <p><strong>Especie:</strong> {detail?.species}</p>
            <p><strong>Estado:</strong> {detail?.status}</p>
          </Col>
          {(detail?.puntaje || detail?.descripcion) && <Col className={styles.col3}>
            <h2>Valoración</h2>
            <p><strong>Puntaje:</strong> {detail?.puntaje}</p>
            <p><strong>Detalle:</strong> {detail?.descripcion}</p>
          </Col>}
        </div>}
      {(user && !loading) && <Divider
        orientation="left">
        Agregar Valoracion
        <EditOutlined onClick={() => setEdit(!edit)} />
      </Divider>}
      {(edit && !loading) && <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          email: user.email,
          puntaje: 1
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item
          label="Email"
          name="email"
        >
          <Input className={styles.input} readOnly />
        </Form.Item>
        <Form.Item
          name="puntaje"
          label="Puntaje">
          <Rate />
        </Form.Item>
        <Form.Item
          label="Detalle"
          name="descripcion"
          rules={[
            {
              required: true,
              message: 'Ingrese un comentario!',
            },
          ]}
        >
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form >}
    </div>
  )
}

export default DetailPage;

