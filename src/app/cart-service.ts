import { Injectable, EventEmitter } from '@angular/core';
import { CartItem } from './cart.model';

@Injectable()

export class CartService{
    shoppingCart: CartItem[] = [];
    count: number = 0;
    total : number = 0;

    addItem(cartItem: CartItem){
        if(this.shoppingCart.find(item=>item.id==cartItem.id)){
            this.increaseQuantity(cartItem);
        }else{
        this.shoppingCart.push(cartItem);
        }
    }
    removeItem(cartItem: CartItem){
        this.shoppingCart.forEach((item, index) => {
            if(item === cartItem){
                this.shoppingCart.splice(index, 1);
            }
        });
    }

    increaseQuantity(cartItem: CartItem){
        this.shoppingCart.filter((item)=>{
            if (cartItem.id === item.id){
                item.quantity += 1;
            }
        })
    }

    decreaseQuantity(cartItem: CartItem){
        this.shoppingCart.filter((item)=>{
            if (cartItem.id === item.id){
                item.quantity -= 1;
                if (item.quantity === 0){
                    this.removeItem(cartItem);
                }
            }
        })
    }

    countItems(){
        const count = this.shoppingCart.reduce((total, cartItem)=>{
            return total += cartItem.quantity;
        }, 0)
        this.count = count;
    }

    countTotal(){
    const amount = this.shoppingCart.reduce((total, cartItem)=>{
        return total += cartItem.quantity * cartItem.price;
        }, 0)
        this.total = amount;
    }
}