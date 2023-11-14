import React from 'react';
import logo from '../../icons/fueled_logo.svg';
import Button from '../button/button';
import { AuthContext } from '../../contexts/authContext';
import styles from './header.module.css';

/* 
  NOTE: The Fueled logo and Login sections are baked into the header on purpose.
  However, if needed, they can move out of the "Header" module to make it loosely coupled and allow more flexibility.

  We could pass 3 props to make Header loosely coupled.
    - leftContainer
    - rightContainer
    - children / middleContainer
*/

function Container(props) {
  return (
    <span className={[styles.container, props.className].join(' ')}>
      {props.children}
    </span>
  );
}

function Header(props) {
  const { isLoggedIn, login, logout, user } = React.useContext(AuthContext);

  // fake login. this can move to its module if needed
  const onLogin = () => isLoggedIn ? logout() : login();

  return (
    <header className={styles.AppHeader}>
      <Container>
        <img src={logo} className={styles.AppLogo} alt="logo" />
      </Container>
      <> 
        {isLoggedIn && props.children}
      </>
      <Container className={styles.rightContainer}>
        <span className={styles.email}>
          {isLoggedIn ? user : ''}
        </span>
        <Button className={styles.loginBtn} onClick={onLogin}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
      </Container>
    </header>
  );
}

export default Header;
