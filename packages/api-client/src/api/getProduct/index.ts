import { Endpoints } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params
) => {
  console.log('getProduct has been called');



  //return await context.client.get('products/' + params);

  return { data: {
      id: 1,
      sku: 'BPE',
      name: "Best product Ever",
      slug: "best-product-ever",
      description: "Really should buy this",
      price: 99.99,
      primaryImage: "url",
      gallery: [],
      rating: {
        average: 5,
        count: 99,
      },
      //variants: SfProductVariant[];
      //attributes: SfAttribute[];
      quantityLimit: 5,
    } };
};
