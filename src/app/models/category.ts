import {DocumentReference} from '@angular/fire/firestore';

export class Category {
  name: string;
  imgUrl: string;
  items: DocumentReference[];
}
