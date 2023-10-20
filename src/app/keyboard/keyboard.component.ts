import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from './keyboard.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit{

  keyboards: Keyboard[] = []
  
  constructor(private router: Router,
    private cartService: CartService,
    private http : HttpClient,
    private userService: UserService) {}


accessItem(id:string){
  this.router.navigate(['/keyboard/item', id]);
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

ngOnInit(): void {
  this.fetchComponents();
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

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/keyboard')
.pipe(map(responseData => {
  let postsArray:Keyboard[] = [];
  for (const key in responseData){
    if(responseData.hasOwnProperty(key)){
      const caseObj = this.convertToObjectCase(responseData[key]);
      postsArray.push(caseObj);
    }      
  }
  return postsArray;
}))
.subscribe(posts => {
  console.log(posts);
  this.keyboards = posts;
});
}

}
