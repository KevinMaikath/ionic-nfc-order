export class Item {
    imgUrl: string;
    ingredients: [];

    constructor(url: string, ingredients: []) {
        this.imgUrl = url;
        this.ingredients = ingredients;
    }
}
