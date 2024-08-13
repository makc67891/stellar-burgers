import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModalData,
  isLoadingSelector,
  modalDataSelector
} from '../../services/order/order';
import { userSelector } from '../../services/user/user';
import { useNavigate } from 'react-router-dom';
import {
  resetState,
  stateSelector
} from '../../services/constructor/burger-constructor';
import { postOrder } from '../../services/order/thunk';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const orderRequest = useSelector(isLoadingSelector);
  const orderModalData = useSelector(modalDataSelector);
  const constructorItems = useSelector(stateSelector);

  const data: string[] = [
    ...constructorItems.ingredients.map((i) => i._id),
    constructorItems.bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(postOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(resetState());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
