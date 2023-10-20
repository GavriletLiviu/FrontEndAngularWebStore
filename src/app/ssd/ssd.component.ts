import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ssd } from './ssd.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ssd',
  templateUrl: './ssd.component.html',
  styleUrls: ['./ssd.component.css']
})
export class SsdComponent implements OnInit{

  ssds: Ssd[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/ssd/item', id]);
}
addItem(ssd: Ssd){
  if(this.userService.isLoggedin){
    const item = new CartItem(ssd.id, ssd.title, ssd.price, 1);
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

private convertToObjectCase(data:any):Ssd{
const caseObj = new Ssd(
  data.id,
  data.title,
  data.manufacturer,
  data.capacity,
  data.connector,
  data.cache,
  data.memoryType,
  data.formFactor,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/ssd')
.pipe(map(responseData => {
  let postsArray:Ssd[] = [];
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
  this.ssds = posts;
});
}

}
