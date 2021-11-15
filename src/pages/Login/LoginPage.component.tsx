import 'antd/dist/antd.css';
import styles from './LoginPage.module.css';
import { Form, Input, Button } from 'antd';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../services/Firebase';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import { useState } from 'react';

interface User {
  email: string,
  password: string
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: User) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
        history.push('/');
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      history.replace('/login');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const history = useHistory();

  const goToSignUp = () => history.push('/signUp');

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
          <h1>LOGIN</h1>
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
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Ingresar
            </Button>
            <h3>No tengo cuenta,
              <Button type="link" onClick={goToSignUp}>
                Registrarme
              </Button></h3>
          </Form.Item>
        </Form >}
    </div>
  );
};

export default LoginPage;