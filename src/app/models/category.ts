import {DocumentReference} from '@angular/fire/firestore';

/**
 * Category class, corresponding to a Firestore document from the 'categories' collection.
 */
export class Category {

  /** Category name */
  name: string;

  /** Url of the main category image */
  imgUrl: string;

  /** List of documents, corresponding to the items inside this category */
  items: DocumentReference[];
}
