import { client } from '../../client';
import { SfCartLineItem, SfMoney, SfProduct, TODO } from '../../types';


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
 * @param product
 * Just like our API methods, our SDK connector methods accept a single props parameter which carries relevant sub-properties. Therefore, there isn’t much to be described within that TSDoc section.
 *
 * @param quantity
 * @returns
 * Human-friendly information what the SDK methods returns.
 *
 * @example
 * A short code snippet showing how to use the method. Usually we have more than one @example. We should strive for adding as many examples as possible here, with multiple param configurations.
 */
export async function addToCart(product: SfProduct, quantity: number) {

  const lineItemsCookie = useCookie<SfCartLineItem[]>('line-items');

  let lineItems: SfCartLineItem[] = [];
// create sfCart line item from props
  const totalPrice: SfMoney = {
    currency: "USD",
    amount: product.price.value.amount * quantity,
    precisionAmount: "2",
  };
  let newLineItem: SfCartLineItem = {
    attributes: product.attributes,
    id: product.id,
    image: product.primaryImage,
    name: product.name,
    quantity: quantity,
    sku: product.sku,
    slug: product.slug,
    totalPrice: totalPrice,
    unitPrice: product.price
  }

  //  add quantity from old items and new
  if ( typeof lineItemsCookie.value == "undefined") { // if nothing has been added yet
    lineItems.push(newLineItem);
  } else {
    lineItems = lineItemsCookie.value;
    const oldItemIndex = lineItems.findIndex((lineItem) => lineItem.slug == product.slug)
    if (oldItemIndex != -1) { // if it's a quantity change
      lineItems[oldItemIndex].quantity += quantity;
      //recalculate total price
      lineItems[oldItemIndex].totalPrice.amount = lineItems[oldItemIndex].quantity * lineItems[oldItemIndex].unitPrice.value.amount;
    } else { // add additional items
      lineItems.push(newLineItem);
    }
  }

  lineItemsCookie.value = lineItems;
  return lineItems;
}
