import { TOrder } from '@utils-types';

export const userOrdersMock: TOrder[] = [
  {
    _id: '66b47e31119d45001b4fe58d',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-08T08:13:37.656Z',
    updatedAt: '2024-08-08T08:13:38.126Z',
    number: 48809
  },
  {
    _id: '66b47ea3119d45001b4fe58f',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-08T08:15:31.968Z',
    updatedAt: '2024-08-08T08:15:32.422Z',
    number: 48810
  }
];
