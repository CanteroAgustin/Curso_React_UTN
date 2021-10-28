import 'antd/dist/antd.css';
import styles from './LoginPage.module.css';
import { Form, Input, Button } from 'antd';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../services/Firebase';
import { useHistory } from 'react-router';

interface User {
  email: string,
  password: string
}

const LoginPage = () => {
  const onFinish = async (values: User) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
        history.push('/');
      });
    } catch (error) {
      history.push('/login');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const history = useHistory();

  const goToSignUp = () => history.push('/SignUp');

  return (
    <div className={styles.container}>
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
      </Form >
    </div>
  );
};

export default LoginPage;