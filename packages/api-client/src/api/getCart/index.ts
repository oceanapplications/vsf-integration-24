import { Endpoints } from '../../types';

export const getCart: Endpoints['getCart'] = async (
  context,
  params
) => {
  console.log('getCart has been called');

  return { data: 'Hello from getCart endpoint!' };
};
