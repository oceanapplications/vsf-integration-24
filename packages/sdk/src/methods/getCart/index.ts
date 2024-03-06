import { client } from '../../client';
import { SfCart, SfCartLineItem, SfMoney } from '../../types';

/**
 * Method summary - General information about the SDK method, usually a single sentence.
 *
 * @remarks
 * In this section, we have been adding detailed information such as:
 * * what API middleware endpoint this method is calling,
 * * what SAP OCC API endpoints are being called as a result of using this method,
 * * when this method can be used and when it can’t (e.g. logged-in vs anonymous users),
 * * simply everything what helps with understanding how it works.
 *
 * @param props
 * Just like our API methods, our SDK connector methods accept a single props parameter which carries relevant sub-properties. Therefore, there isn’t much to be described within that TSDoc section.
 *
 * @returns
 * Human-friendly information what the SDK methods returns.
 *
 * @example
 * A short code snippet showing how to use the method. Usually we have more than one @example. We should strive for adding as many examples as possible here, with multiple param configurations.
 */
export async function getCart(): Promise<SfCart> {
  const lineItemsCookie = useCookie<SfCartLineItem[]>('line-items');

  let items = lineItemsCookie.value;
  let data: SfCart = {
    appliedCoupons: [],
    billingAddress: null,
    customerEmail: null,
    id: 'cart',
    lineItems: items,
    shippingAddress: null,
    shippingMethod: null,
    subtotalDiscountedPrice: totalPrice(items),
    subtotalRegularPrice: totalRegularPrice(items),
    totalCouponDiscounts: {amount: 0, currency: 'USD', precisionAmount: '2'},
    totalItems: items.reduce((partialSum: number, item:SfCartLineItem) => item.quantity + partialSum, 0),
    totalPrice: totalPrice(items),
    totalShippingPrice: {amount: 0, currency: 'USD', precisionAmount: '2'},
    totalTax: {amount: 0, currency: 'USD', precisionAmount: '2'}
  };
  return data
}

function totalPrice(lineItems: SfCartLineItem[]): SfMoney {
  const total = lineItems.reduce((partialSum:number, item:SfCartLineItem) => item.totalPrice.amount + partialSum, 0)
  return { amount: total, currency: 'USD', precisionAmount: '2' }
}

function totalRegularPrice(lineItems: SfCartLineItem[]): SfMoney {
  const total = lineItems.reduce((partialSum:number, item:SfCartLineItem) => item.unitPrice.regularPrice.amount * item.quantity + partialSum, 0)
  return { amount: total, currency: 'USD', precisionAmount: '2' }
}
