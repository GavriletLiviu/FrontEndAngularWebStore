import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ram } from './ram.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit{

  rams: Ram[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/ram/item', id]);
}
addItem(ram: Ram){
  if(this.userService.isLoggedin){
    const item = new CartItem(ram.id, ram.title, ram.price, 1);
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

private convertToObjectCase(data:any):Ram{
const caseObj = new Ram(
  data.id,
  data.title,
  data.manufacturer,
  data.capacity,
  data.generation,
  data.kit,
  data.frequency,
  data.voltage,
  data.latency,
  data.radiator,
  data.overclock,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/ram')
.pipe(map(responseData => {
  let postsArray:Ram[] = [];
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
  this.rams = posts;
});
}
}

