/**
 * Item for the shopping cart, corresponding to a product.
 */
export class ShopItem {

  /** Products name */
  name: string;

  /** Products price */
  price: number;

  /** Current quantity of the product in the shopping cart */
  count: number;
}

export class ShopMenuItem {
  name: string;
  price: number;
  items: string[];
  count: number;
}
