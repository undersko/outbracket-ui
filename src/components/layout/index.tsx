import * as React from 'react';
import styles from './layout.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {FC, PropsWithChildren} from 'react';

const Layout: FC<PropsWithChildren> = ({children}) => (
  <div className={styles.container}>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default Layout;
