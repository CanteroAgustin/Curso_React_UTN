import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { getAuth } from '@firebase/auth';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo1.png';
import { StoreContext } from '../../stores/StoreProvider';
import styles from './nav.module.css';

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
        {location.pathname !== '/login' && location.pathname !== '/signUp' && <img className={styles.logo} src={logo} alt="logo" />}
        {user && location.pathname !== '/favs' && <li className={styles.navItem}><NavLink to="/favs"><StarOutlined /> Favoritos</NavLink></li>}
        {location.pathname !== '/list' && <li className={styles.navItem}><NavLink to="/list"><HomeOutlined /> Home</NavLink></li>}
        {(location.pathname !== '/login' && !user) && <li className={styles.navItem}><NavLink to="/login">Ingresar</NavLink></li>}
        {(location.pathname !== '/signUp' && !user) && <li className={styles.navItem}><NavLink to="/signUp">Registrarme</NavLink></li>}
        {user && <li>
          <Dropdown overlay={menu}>
            <Avatar
              className={styles.avatar}
              size={isTabletOrMobile ? 48 : 64}
              src={
                avatar
              }
            />
          </Dropdown>
        </li>}
      </nav>
    </>
  )
}

export default Nav
