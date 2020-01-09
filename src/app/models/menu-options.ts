import {Product} from './product';

export class MenuOptions {
  label: string;
  options: Product[];
}

export class MenuOptionsValues {
  index: number;
  product: Product;
  categoryName: string;
}
