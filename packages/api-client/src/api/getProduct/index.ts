import { Endpoints, ID, TODO, SfImage, SfProduct } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params: TODO
) => {
  console.log('getProduct has been called');
  const data = await context.client.get('products/' + params.id);
  let output: SfProduct = {
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
        precisionAmount: "2"
      },
      value: {
        currency: "USD",
        amount: data.data.data.price,
        precisionAmount: "2"
      },
    },
    primaryImage: getPrimaryImage(data.data.data),
    gallery: getGallery(data.data.data),
    rating: {
      average: 5,
      count: 99,
    },
    variants: [],
    attributes: [],
    quantityLimit: null,
  };
  return output;
};

function getPrimaryImage(data): SfImage {
  return {
    url: data.gallery[0]?.url ?? null,
    alt:  data.gallery[0]?.alt ?? null,
  };
}

function getGallery(data): SfImage[] {
  let result = [];
  data.gallery.forEach(d => {
    result.push({
      url: d.url,
      alt: d?.alt ?? null,
    })
  })
  return result;
}
