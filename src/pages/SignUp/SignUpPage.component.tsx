import React from 'react';
import 'antd/dist/antd.css';
import styles from './SignUpPage.module.css';
import { Form, Input, Button } from 'antd';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../services/Firebase';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface User {
  email: string,
  password: string
}

const createAccount = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
      console.error("Created!!!");
    });
  } catch (error) {
    console.error(error);
  }
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const offset = isTabletOrMobile ? 0 : 4;

  const onFinish = (values: User) => {
    setLoading(true);
    createAccount(values.email, values.password).then(() => {
      history.push('/');
      setLoading(false);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const history = useHistory();
  const goToLogin = () => {
    history.replace('/login')
  };

  return (
    <div className={styles.container}>
      {loading ? <Spin /> :
        <Form
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
          <h1>REGISTRO</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input className={styles.email} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password className={styles.password} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Registrarme
            </Button>
            <h3>Ya tengo una cuenta,
              <Button type="link" onClick={goToLogin}>
                Ingresar
              </Button></h3>
          </Form.Item>
        </Form>}
    </div>
  );
};

export default SignUpPage;