/**
 * Product class, corresponding to a Firestore document from the 'products' collection.
 */
export class Product {

  /** Products name */
  name: string;

  /** Url of the main products image */
  imgUrl: string;

  /** List of ingredients of the product */
  ingredients: string[];

  /** Products price */
  price: number;
}
