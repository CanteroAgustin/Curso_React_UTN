import { HomeOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import styles from './nav.module.css';
import { Avatar, Menu, Dropdown, Button, Image } from 'antd';
import avatar from '../../assets/avatar.png';
import { getAuth } from '@firebase/auth';
import { StoreContext } from '../../stores/StoreProvider';
import logo from '../../assets/logo1.png';
import { useMediaQuery } from 'react-responsive';

const auth = getAuth();

function Nav() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [, , user] = useContext(StoreContext);
  const location = useLocation();
  const history = useHistory();

  const signOut = async () => {
    await auth.signOut().then(() => console.log('user logged out'));
    localStorage.removeItem("page");
    history.push('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key='logout'>
        <Button type="link" block onClick={signOut}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav>
        {location.pathname === '/' && <img className={styles.logo} src={logo} alt="logo" />}
        {location.pathname !== '/' && <li className={styles.navItem}><NavLink to="/"><HomeOutlined /> Home</NavLink></li>}
        {(location.pathname !== '/login' && !user) && <li className={styles.navItem}><NavLink to="/login">Ingresar</NavLink></li>}
        {(location.pathname !== '/signUp' && !user) && <li className={styles.navItem}><NavLink to="/signUp">Registrarme</NavLink></li>}
        {user && <li className={styles.navItem}>
          <Dropdown overlay={menu}>
            <Avatar
              className={styles.avatar}
              size={isTabletOrMobile ? 48 : 64}
              src={
                <Image
                  src={avatar}
                />
              }
            />
          </Dropdown>
        </li>}
      </nav>
    </>
  )
}

export default Nav
