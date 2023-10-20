import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headphone } from './headphones.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-headphones',
  templateUrl: './headphones.component.html',
  styleUrls: ['./headphones.component.css']
})
export class HeadphonesComponent implements OnInit{

  headphones: Headphone[] = [];


  constructor(private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private userService: UserService) {}


accessItem(id:string){
  this.router.navigate(['/headphones/item', id]);
}

addItem(headphone: Headphone){
  if(this.userService.isLoggedin){
    const item = new CartItem(headphone.id, headphone.title, headphone.price, 1);
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

private convertToObjectCase(data:any):Headphone{
const caseObj = new Headphone(
  data.id,
  data.title,
  data.manufacturer,
  data.connectivity,
  data.impedance,
  data.microphone,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/headphones')
.pipe(map(responseData => {
  let postsArray:Headphone[] = [];
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
  this.headphones = posts;
});
}
}
