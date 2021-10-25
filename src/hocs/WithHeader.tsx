import React, { ReactNode } from 'react';
import logo from '../assets/logo.png';

interface Props {
  children: ReactNode;
}

function WithHeader({ children }: Props) {

  return (
    <>
      <img style={{ width: '30%', margin: 'auto', display: 'block' }} src={logo} alt="logo" />
      <div>{children}</div>
    </>
  )
}
export default WithHeader;

