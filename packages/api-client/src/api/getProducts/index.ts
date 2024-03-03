import { Endpoints, SfProduct } from '../../types';
import { crmProductToSFProduct } from '../../transformers/product';

export const getProducts: Endpoints['getProducts'] = async (
  context,
  params
) => {
  console.log('getProducts has been called');
  const response = await context.client.get('products');

  return crmToProducts(response.data.data);
};


function crmToProducts(data): SfProduct[] {
  let output: SfProduct[] = [];
  data.forEach(d => {
    output.push(crmProductToSFProduct(d))
  });
  return output;
}
