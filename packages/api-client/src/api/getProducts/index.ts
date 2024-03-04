import { Endpoints, SfProduct, GetProducts, SfPagination } from '../../types';
import { crmProductToSFProduct } from '../../transformers/product';

export const getProducts: Endpoints['getProducts'] = async (
  context,
  params
) => {
  console.log('getProducts has been called');
  const response = await context.client.get('products');

  let output: GetProducts = {
    products: crmToProducts(response.data.data),
    pagination: crmToPagination(response.data.meta),
    facets: null,
    subCategories: null,
    categoryHierarchy: null,
    currentCategory: null,
  };

  return output;
};


function crmToProducts(data): SfProduct[] {
  let output: SfProduct[] = [];
  data.forEach(d => {
    output.push(crmProductToSFProduct(d))
  });
  return output;
}

function crmToPagination(data): SfPagination {
  return {
    currentPage: data.current_page,
    pageSize: data.per_page,
    totalPages: data.last_page,
    totalResults: data.total,
  };
}
