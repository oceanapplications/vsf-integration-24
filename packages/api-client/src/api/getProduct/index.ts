import { Endpoints, ID, TODO } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params: TODO
) => {
  console.log('getProduct has been called');
  const data = await context.client.get('products/' + params.id);

  return {
      id: data.data.data.id,
      sku: data.data.data.sku,
      name: data.data.data.name,
      slug: data.data.data.name.replace(/\s+/g, '-').toLowerCase() + '-' + data.data.data.id,
      description: data.data.data.description,
      price: {
        isDiscounted: false,
        regularPrice: {
          currency: "USD",
          amount: data.data.data.price,
          precision: 2
        },
        value: {
          currency: "USD",
          amount: data.data.data.price,
          precision: 2
        },
      },
      primaryImage: getPrimaryImage(data.data.data),
      gallery: getGallery(data.data.data),
      rating: {
        average: 5,
        count: 99,
      },
      //variants: SfProductVariant[];
      //attributes: SfAttribute[];
      quantityLimit: null,
    };
};

function getPrimaryImage(data) {
  return {
    image: data.gallery[0]?.url ?? null,
    alt:  data.gallery[0]?.alt ?? null,
  };
}

function getGallery(data) {
  let result = [];
  data.gallery.forEach(d => {
    result.push({
      image: d.url,
      alt: d?.alt ?? null,
    })
  })
  return result;
}
