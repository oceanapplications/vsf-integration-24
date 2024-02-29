import { Endpoints, ID, TODO } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params: TODO
) => {
  console.log('getProduct has been called');
  console.dir(params);
  const data = await context.client.get('products/' + params.id);

  return(data.data.data);

  return {
      id: 1,
      sku: 'BPE',
      name: "Best product Ever",
      slug: "best-product-ever",
      description: "Really should buy this",
      price: {
        isDiscounted: false,
        regularPrice: {
          currency: "USD",
          amount: 99.99,
          precision: 2
        },
        value: {
          currency: "USD",
          amount: 99.99,
          precision: 2
        },
      },
      primaryImage: "url",
      gallery: [],
      rating: {
        average: 5,
        count: 99,
      },
      //variants: SfProductVariant[];
      //attributes: SfAttribute[];
      quantityLimit: 5,
    };
};
