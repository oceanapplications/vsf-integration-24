import { Endpoints } from '../../types';

export const addToCart: Endpoints['addToCart'] = async (
  context,
  params
) => {
  console.log('addToCart has been called');

  return { data: 'Hello from addToCart endpoint!' };
};
