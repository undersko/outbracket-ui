import React, {FC, PropsWithChildren} from 'react';

const Main: FC<PropsWithChildren> = ({children}) => {
  return <div>{children}</div>;
};

export default Main;
