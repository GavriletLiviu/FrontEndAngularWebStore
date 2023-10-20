import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mouse } from './mouse.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.css']
})
export class MouseComponent implements OnInit{

  mice: Mouse[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/mouse/item', id]);
}

addItem(mouse: Mouse){
  if(this.userService.isLoggedin){
    const item = new CartItem(mouse.id, mouse.title, mouse.price, 1);
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

private convertToObjectCase(data:any):Mouse{
const caseObj = new Mouse(
  data.id,
  data.title,
  data.manufacturer,
  data.connection,
  data.sensor,
  data.resolution,
  data.buttons,
  data.weight,
  data.dimensions,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/mouse')
.pipe(map(responseData => {
  let postsArray:Mouse[] = [];
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
  this.mice = posts;
});
}

}
