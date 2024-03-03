import { Endpoints, ID, TODO, SfImage, SfProduct } from '../../types';
import { crmProductToSFProduct } from '../../transformers/product';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params: TODO
) => {
  console.log('getProduct has been called');
  const response = await context.client.get('products/' + params.id);
  return crmProductToSFProduct(response.data.data);
};
