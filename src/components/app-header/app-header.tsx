import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userSelector } from '../../services/user/user';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
