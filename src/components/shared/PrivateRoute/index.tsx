import React, {FC, PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

import {PAGES} from '@constants/pages';

import useCustomController from '@hooks/useCustomController';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

const PrivateRoute: FC<PropsWithChildren> = ({children}) => {
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  if (tokenController.isLoggedIn() && children) {
    return <>{children}</>;
  } else {
    return <Navigate to={PAGES.LOGIN} />;
  }
};

export default PrivateRoute;
