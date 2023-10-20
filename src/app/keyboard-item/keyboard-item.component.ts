import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Keyboard } from '../keyboard/keyboard.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-keyboard-item',
  templateUrl: './keyboard-item.component.html',
  styleUrls: ['./keyboard-item.component.css']
})
export class KeyboardItemComponent {
  keyboardId!: string;
  sKeyboard!: Keyboard;

  keyboards: Keyboard[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.keyboardId = params['id'];
          this.fetchItem();
        }
    );
    }
    addItem(keyboard: Keyboard){
      if(this.userService.isLoggedin){
        const item = new CartItem(keyboard.id, keyboard.title, keyboard.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

private convertToObjectCase(data:any):Keyboard{
  const caseObj = new Keyboard(
    data.id,
    data.title,
    data.manufacturer,
    data.connect,
    data.lights,
    data.weight,
    data.type,
    data.dimensions,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/keyboard/';
  url += this.keyboardId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Keyboard;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sKeyboard = scpu;
      }
    })
}
 
}
