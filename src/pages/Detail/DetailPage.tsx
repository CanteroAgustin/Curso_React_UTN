import { EditOutlined } from '@ant-design/icons';
import { Descriptions, Divider } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../../interfaces/ListInterface";
import * as CustomService from "../../services/CustomService";
import { Form, Input, Button } from 'antd';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const { id }: { id: string } = useParams();
  const [detail, setDetail] = useState<Character>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    CustomService.getSpecificCharacter(id)
      .then((data: any) => {
        setDetail(data);
        console.log(data);
      }).catch(err => {
        setDetail(undefined);
      })
  }, [id])

  const onFinish = async () => {

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ margin: 50 }}>
      <img
        style={{ margin: '0 auto', display: 'block', width: '20%', borderRadius: 10 }}
        alt="imagen"
        src={detail?.image}
      />
      <Descriptions
        title="Informacion"
        bordered
        size='small'
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        style={{ margin: "0 auto", width: '75%' }}
      >
        <Descriptions.Item label="Nombre">{detail?.name}</Descriptions.Item>
        <Descriptions.Item label="Creación">{detail?.created}</Descriptions.Item>
        <Descriptions.Item label="Genero">{detail?.gender}</Descriptions.Item>
        <Descriptions.Item label="Origen">{detail?.origin?.name}</Descriptions.Item>
        <Descriptions.Item label="Especie">{detail?.species}</Descriptions.Item>
        <Descriptions.Item label="Estado">{detail?.status}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: "0 auto", padding: '20px 8% 20px 8%' }} orientation="left">
        Agregar Informacion
        <EditOutlined onClick={() => setEdit(!edit)} />
      </Divider>
      {edit && <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item
          label="comentarios"
          name="comentarios"
          rules={[
            {
              required: true,
              message: 'Ingrese un comentario!',
            },
          ]}
        >
          <Input className={styles.email} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
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

