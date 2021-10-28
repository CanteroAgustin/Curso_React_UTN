import { ReactNode } from 'react';
import Nav from '../components/NavComponent/NavComponent';

interface Props {
  children: ReactNode;
}

function WithHeader({ children }: Props) {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  )
}
export default WithHeader;

