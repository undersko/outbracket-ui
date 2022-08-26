import {useState} from 'react';

export default <Controller>(instanceCreator: (forceRerender: () => void | null) => Controller) => {
  const [, setFakeState] = useState(false);
  const forceRerender = () => {
    setFakeState((prevState) => !prevState);
  };

  return instanceCreator(forceRerender);
};
