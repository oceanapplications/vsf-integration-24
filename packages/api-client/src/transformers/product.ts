import { SfImage, SfProduct } from '../types';

function crmProductToSFProduct(data): SfProduct {
  return {
    id: data.id,
    sku: data.sku,
    name: data.name,
    slug: data.name.replace(/\s+/g, '-').toLowerCase() + '-' + data.id,
    description: data.description,
    price: {
      isDiscounted: false,
      regularPrice: {
        currency: "USD",
        amount: data.price,
        precisionAmount: "2"
      },
      value: {
        currency: "USD",
        amount: data.price,
        precisionAmount: "2"
      },
    },
    primaryImage: getPrimaryImage(data),
    gallery: getGallery(data),
    rating: {
      average: 5,
      count: 99,
    },
    variants: [],
    attributes: [],
    quantityLimit: null,
  };
}

function getPrimaryImage(data): SfImage {
  if (!Array.isArray(data.gallery) || data.gallery.length == 0) {
    return null;
  }
  return {
    url: data.gallery[0]?.url ?? null,
    alt:  data.gallery[0]?.alt ?? null,
  };
}

function getGallery(data): SfImage[] {
  if (!Array.isArray(data.gallery) || data.gallery.length == 0) {
    return null;
  }
  let result = [];
  data.gallery.forEach(d => {
    result.push({
      url: d.url,
      alt: d?.alt ?? null,
    })
  })
  return result;
}

export {crmProductToSFProduct};
