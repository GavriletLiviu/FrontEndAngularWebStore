export class CartItem{
    id: string;
    title: string;
    price: number;
    quantity: number;
    constructor(id:string, title:string, price:number, quantity:number){
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}