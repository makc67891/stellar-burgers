import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ordersSelector } from '../../services/feed/feed';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/feed/thunk';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // ok
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    location.assign('/feed');
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
