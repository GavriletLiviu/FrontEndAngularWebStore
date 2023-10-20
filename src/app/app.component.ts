import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from './cart.model';
import { CartService } from './cart-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CartService]
})
export class AppComponent implements OnInit{
  title = 'Bachelor';
  

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      
  }

}
