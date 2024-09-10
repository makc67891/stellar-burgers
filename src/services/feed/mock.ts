import { TOrdersData } from '@utils-types';

export const feedMock: TOrdersData = {
  orders: [
    {
      _id: '66ca0159119d45001b501df5',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-08-24T15:50:49.077Z',
      updatedAt: '2024-08-24T15:50:49.619Z',
      number: 50987
    },
    {
      _id: '66ca00df119d45001b501df2',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный минеральный био-марсианский бургер',
      createdAt: '2024-08-24T15:48:47.036Z',
      updatedAt: '2024-08-24T15:48:47.582Z',
      number: 50986
    }
  ],
  total: 2000,
  totalToday: 2
};
