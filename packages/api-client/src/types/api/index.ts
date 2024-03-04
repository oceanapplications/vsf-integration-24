export * from './endpoints';

type Maybe<TType> = TType | null;
type SfId = string;
interface SfMoney {
  currency: string;
  amount: number;
  precisionAmount: string;
}
interface SfDiscountablePrice {
  isDiscounted: boolean;
  regularPrice: SfMoney;
  /**
   * Price with discounts. If there is no discount, it will be the same as regularPrice
   */
  value: SfMoney;
}
interface SfImage {
  alt: Maybe<string>;
  url: string;
}
interface SfAttribute {
  label: string;
  name: string;
  value: string;
  valueLabel: string;
}
interface SfCreateAddressBody {
  address1: string;
  address2?: Maybe<string>;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  state: string;
  titleCode: string;
}
interface SfAddress {
  address1: Maybe<string>;
  address2?: Maybe<string>;
  city: Maybe<string>;
  country: Maybe<string>;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  phoneNumber: Maybe<string>;
  postalCode: Maybe<string>;
  state: Maybe<string>;
  titleCode: Maybe<string>;
}
type SfCurrency = string;

interface SfShippingMethod {
  description: Maybe<string>;
  estimatedDelivery: Maybe<string>;
  id: string;
  name: string;
  price: SfMoney;
}
interface SfShippingMethods {
  methods: SfShippingMethod[];
}

interface SfCartLineItem {
  attributes: SfAttribute[];
  id: SfId;
  image: Maybe<SfImage>;
  name: Maybe<string>;
  quantity: number;
  sku: Maybe<string>;
  slug: string;
  /**
   * Product of quantity and unitPrice
   */
  totalPrice: Maybe<SfMoney>;
  unitPrice: Maybe<SfDiscountablePrice>;
}
interface SfCartCoupon {
  code: string;
  id: string;
  name: Maybe<string>;
}
interface SfCart {
  appliedCoupons: SfCartCoupon[];
  /**
   * @default null
   */
  billingAddress: Maybe<SfAddress>;
  /**
   * Active customer's email. Required to complete the checkout
   * @default null
   */
  customerEmail: Maybe<string>;
  id: SfId;
  /**
   * Shipping address is required to get available shipping methods
   * @default null
   */
  lineItems: SfCartLineItem[];
  shippingAddress: Maybe<SfAddress>;
  /**
   * Required to complete the checkout. To get available methods use `getAvailableShippingMethods`
   * @default null
   */
  shippingMethod: Maybe<SfShippingMethod>;
  /**
   * Difference of `subtotalRegularPrice` and discounts applied to line items before providing coupons.
   * If none of the products are discounted, price will be equal to `subtotalRegularPrice`
   */
  subtotalDiscountedPrice: SfMoney;
  /**
   * Total regular price of all line items (coupons, taxes, shipping excluded)
   */
  subtotalRegularPrice: SfMoney;
  totalCouponDiscounts: SfMoney;
  /**
   * Total count of all line items and their's quantities in cart
   */
  totalItems: number;
  /**
   * Total cart price (discounts, taxes, shipping included)
   */
  totalPrice: SfMoney;
  /**
   * Calculated after applying shipping method
   * @default null
   */
  totalShippingPrice: Maybe<SfMoney>;
  totalTax: SfMoney;
}

interface SfCategory {
  id: SfId;
  name: string;
  slug: string;
  subcategories: Maybe<SfCategory[]>;
  productCount: Maybe<number>;
}

interface SfCustomer {
  id: SfId;
  email: string;
  firstName: string;
  lastName: string;
}
interface SfCustomerAddress extends SfAddress {
  id: SfId;
}

interface SfFacetItem {
  label: string;
  value: string;
  productCount: Maybe<number>;
}
interface SfFacet {
  label: string;
  name: string;
  values: SfFacetItem[];
}

interface SfProductVariant {
  id: SfId;
  slug: string;
  sku: Maybe<string>;
  name: Maybe<string>;
  quantityLimit: Maybe<number>;
  attributes: SfAttribute[];
}
interface SfProductReview {
  id: SfId;
  title: Maybe<string>;
  text: Maybe<string>;
  rating: Maybe<number>;
  reviewer: Maybe<string>;
  createdAt: string;
}
interface SfProduct {
  id: SfId;
  sku: Maybe<string>;
  name: Maybe<string>;
  slug: string;
  description: Maybe<string>;
  price: Maybe<SfDiscountablePrice>;
  primaryImage: Maybe<SfImage>;
  gallery: SfImage[];
  rating: Maybe<{
    average: number;
    count: number;
  }>;
  variants: SfProductVariant[];
  attributes: SfAttribute[];
  quantityLimit: Maybe<number>;
}
type SfProductCatalogItem = Omit<SfProduct, "variants" | "gallery" | "description" | "attributes">;
interface SfPagination {
  currentPage: number;
  pageSize: Maybe<number>;
  totalResults: number;
  totalPages: number;
}

interface SfOrderLineItem {
  id: SfId;
  attributes: SfAttribute[];
  unitPrice: SfMoney;
  totalPrice: SfMoney;
  quantity: number;
  image: Maybe<SfImage>;
  productId: SfId;
  productName: string;
  sku: Maybe<string>;
}
interface SfOrder {
  id: SfId;
  orderDate: string;
  status: string;
  lineItems: SfOrderLineItem[];
  subtotalPrice: SfMoney;
  totalShippingPrice: SfMoney;
  totalTax: SfMoney;
  totalPrice: SfMoney;
  shippingAddress: SfAddress;
  billingAddress: SfAddress;
  shippingMethod: SfShippingMethod;
  paymentMethod: string;
}
type SfOrderListItem = Pick<SfOrder, "id" | "orderDate" | "totalPrice" | "status">;

interface RegisterCustomerArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
type RegisterCustomer = (args: RegisterCustomerArgs) => Promise<{
  customer: SfCustomer;
}>;
interface LoginCustomerArgs {
  email: string;
  password: string;
}
type LoginCustomer = (args: LoginCustomerArgs) => Promise<{
  customer: SfCustomer;
}>;
type GetCustomer = () => Promise<{
  customer: Maybe<SfCustomer>;
}>;
type LogoutCustomer = () => Promise<void>;
interface UpdateCustomerArgs {
  email?: string;
  firstName?: string;
  lastName?: string;
}
type UpdateCustomer = (args: UpdateCustomerArgs) => Promise<{
  customer: SfCustomer;
}>;

interface AddCartLineItemArgs {
  /**
   * Product unique identifier - for commercetools it's a SKU, for sap it's a product code
   */
  productId: string;
  sku: Maybe<string>;
  /**
   * Quantity of product to add to cart
   * @default 1
   */
  quantity?: number;
}
interface UpdateCartLineItemArgs {
  lineItemId: string;
  quantity: number;
}
interface RemoveCartLineItemArgs {
  lineItemId: string;
}
interface ApplyCouponToCartArgs {
  couponCode: string;
}
interface RemoveCouponFromCartArgs {
  /**
   * Don't confuse it with coupon code. It can be retrieved from cart.appliedCoupons
   */
  couponId: string;
}
/**
 * Get all information about customer's cart
 */
type GetCart = () => Promise<SfCart>;
/**
 * Add product to cart
 */
type AddCartLineItem = (args: AddCartLineItemArgs) => Promise<SfCart>;
/**
 * Update product quantity in cart
 */
type UpdateCartLineItem = (args: UpdateCartLineItemArgs) => Promise<SfCart>;
/**
 * Remove product from cart
 */
type RemoveCartLineItem = (args: RemoveCartLineItemArgs) => Promise<SfCart>;
/**
 * Apply a coupon to cart to get a discount
 */
type ApplyCouponToCart = (args: ApplyCouponToCartArgs) => Promise<SfCart>;
type RemoveCouponFromCart = (args: RemoveCouponFromCartArgs) => Promise<SfCart>;

type GetCategoriesArgs = {
  ids?: string[];
  slugs?: string[];
};
type GetCategories = (args?: GetCategoriesArgs) => Promise<SfCategory[]>;

interface SetCustomerEmailArgs {
  email: string;
}
interface SetShippingAddress {
  shippingAddress: SfCreateAddressBody;
}
type SetCartAddressArgs = SetShippingAddress;
interface SetShippingMethodArgs {
  shippingMethodId: string;
}
/**
 * Set an email of active customer
 */
type SetCustomerEmail = (args: SetCustomerEmailArgs) => Promise<SfCart>;
/**
 * Set customers adddress
 * @example Set shipping address first
 * setCartAddress({ shippingAddress: { ... } })
 */
type SetCartAddress = (args: SetCartAddressArgs) => Promise<SfCart>;
/**
 * Get available shipping methods based on customer's shipping address
 */
type GetAvailableShippingMethods = () => Promise<SfShippingMethods>;
/**
 * Choose a one shipping method from available shipping methods
 */
type SetShippingMethod = (args: SetShippingMethodArgs) => Promise<SfCart>;

interface CreateCustomerAddressArgs {
  address: SfCreateAddressBody;
}
type CreateCustomerAddress = (args: CreateCustomerAddressArgs) => Promise<{
  address: SfCustomerAddress;
}>;
interface UpdateCustomerAddressArgs {
  id: SfId;
  address: SfCreateAddressBody;
}
type UpdateCustomerAddress = (args: UpdateCustomerAddressArgs) => Promise<{
  address: SfCustomerAddress;
}>;
interface DeleteCustomerAddressArgs {
  id: SfId;
}
type DeleteCustomerAddress = (args: DeleteCustomerAddressArgs) => Promise<void>;
type GetCustomerAddresses = () => Promise<{
  addresses: SfCustomerAddress[];
}>;


type SearchProductsArgs = {
  pageSize?: number;
  currentPage?: number;
  sortBy?: "latest" | "relevant" | "price-low-to-high" | "price-high-to-low";
  search?: string;
  category?: SfCategory["id"];
  facets?: {
    [name: string]: string[];
  };
};
type SearchProducts = (args: SearchProductsArgs) => Promise<{
  products: SfProductCatalogItem[];
  pagination: SfPagination;
  facets: SfFacet[];
  currentCategory: Maybe<SfCategory>;
  subCategories: SfCategory[];
  categoryHierarchy: SfCategory[];
}>;
type GetProductsArgs = {
  ids?: string[];
  skus?: string[];
};
type GetProducts = {
  products: SfProductCatalogItem[];
  pagination: SfPagination;
  facets: SfFacet[];
  currentCategory: Maybe<SfCategory>;
  subCategories: SfCategory[];
  categoryHierarchy: SfCategory[];
};
type GetProductDetailsArgs = {
  id: SfId;
  sku?: string;
};
type GetProductDetails = (args: GetProductDetailsArgs) => Promise<{
  product: SfProduct;
  categoryHierarchy: SfCategory[];
}>;
type GetProductReviewsArgs = {
  productId: SfId;
  pageSize?: number;
  currentPage?: number;
};
type GetProductReviews = (args: GetProductReviewsArgs) => Promise<{
  reviews: SfProductReview[];
  pagination: SfPagination;
}>;
type AddProductReviewArgs = {
  productId: SfId;
  productSku?: string;
  review: Pick<SfProductReview, "title" | "text" | "rating" | "reviewer">;
};
type AddProductReview = (args: AddProductReviewArgs) => Promise<{
  review: SfProductReview;
}>;

type GetCurrencies = () => Promise<{
  currencies: SfCurrency[];
  defaultCurrency: SfCurrency;
}>;

interface GetOrdersArgs {
  pageSize?: number;
  currentPage?: number;
}
type GetOrders = (args?: GetOrdersArgs) => Promise<{
  orders: SfOrderListItem[];
  pagination: SfPagination;
}>;
interface GetOrderArgs {
  id: string;
}
type GetOrderDetails = (args: GetOrderArgs) => Promise<SfOrder>;

type DefaultNormalizers = {
  normalizeCategory(category: any): any;
  normalizeCart(cart: any, ctx?: any): any;
  normalizeShippingMethod(input: any, ctx?: any): any;
  normalizeCustomer(user: any): any;
  normalizeProductCatalogItem(product: any, ctx?: any): any;
  normalizePagination(inputData: any): any;
  normalizeFacet(facet: any, ctx?: any): any;
  normalizeProduct(product: any, ctx: any): any;
  normalizeProductReview(review: any): any;
  unnormalizeAddress(address: SfCreateAddressBody): any;
  normalizeCustomerAddress(address: any): any;
  normalizeOrderListItem(order: any, ctx?: any): any;
  normalizeOrder(order: any, ctx?: any): any;
};
type NormalizersLike = {
  [TKey in keyof DefaultNormalizers]: DefaultNormalizers[TKey];
};
type ContextWithNormalizers<TNormalizers> = {
  config: {
    normalizers: TNormalizers;
  };
};
type ApiMethodsLike<TContext = any> = Record<string, (context: TContext, ...arguments_: any[]) => any>;
type GetContextType<TApiMethods> = TApiMethods extends Record<string, (context: infer TContext, ...arguments_: any[]) => any> ? TContext : never;
type ExtendUnifiedApiMethods<TApiMethods extends ApiMethodsLike> = {
  [TKey in keyof TApiMethods]?: (...params: Parameters<TApiMethods[TKey]>) => any;
} & ApiMethodsLike<GetContextType<TApiMethods>>;
type CustomIntegrationNormalizers<TIntegrationNormalizers extends NormalizersLike> = {
  [TKey in keyof TIntegrationNormalizers]: (...arguments_: Parameters<any>) => any;
};
type Merge<TLeft, TRight> = Omit<TLeft, keyof TRight> & TRight;
interface CreateUnifiedExtensionParams<TNormalizers, TExtendUnifiedApiMethods, TConfig = any> {
  normalizers?: TNormalizers;
  extendApiMethods?: TExtendUnifiedApiMethods;
  config?: TConfig;
}
interface UnifiedConfig {
  currencies?: SfCurrency[];
  defaultCurrency: SfCurrency;
}

export { AddCartLineItem, AddCartLineItemArgs, AddProductReview, AddProductReviewArgs, ApiMethodsLike, ApplyCouponToCart, ApplyCouponToCartArgs, ContextWithNormalizers, CreateCustomerAddress, CreateCustomerAddressArgs, CreateUnifiedExtensionParams, CustomIntegrationNormalizers, DefaultNormalizers, DeleteCustomerAddress, DeleteCustomerAddressArgs, ExtendUnifiedApiMethods, GetAvailableShippingMethods, GetCart, GetCategories, GetCategoriesArgs, GetCurrencies, GetCustomer, GetCustomerAddresses, GetOrderArgs, GetOrderDetails, GetOrders, GetOrdersArgs, GetProductDetails, GetProductDetailsArgs, GetProductReviews, GetProductReviewsArgs, GetProducts, GetProductsArgs, LoginCustomer, LoginCustomerArgs, LogoutCustomer, Maybe, Merge, NormalizersLike, RegisterCustomer, RegisterCustomerArgs, RemoveCartLineItem, RemoveCartLineItemArgs, RemoveCouponFromCart, RemoveCouponFromCartArgs, SearchProducts, SearchProductsArgs, SetCartAddress, SetCartAddressArgs, SetCustomerEmail, SetCustomerEmailArgs, SetShippingAddress, SetShippingMethod, SetShippingMethodArgs, SfAddress, SfAttribute, SfCart, SfCartCoupon, SfCartLineItem, SfCategory, SfCreateAddressBody, SfCurrency, SfCustomer, SfCustomerAddress, SfDiscountablePrice, SfFacet, SfId, SfImage, SfMoney, SfOrder, SfOrderLineItem, SfOrderListItem, SfPagination, SfProduct, SfProductCatalogItem, SfProductReview, SfProductVariant, SfShippingMethod, SfShippingMethods, UnifiedConfig, UpdateCartLineItem, UpdateCartLineItemArgs, UpdateCustomer, UpdateCustomerAddress, UpdateCustomerAddressArgs, UpdateCustomerArgs };
