import { Component, OnInit } from '@angular/core';
import { Fan } from './fan.model';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css']
})
export class FanComponent implements OnInit{

  fans: Fan[] = []


  constructor(private router: Router,
    private cartService: CartService,
    private http :HttpClient,
    private userService: UserService) {}


  accessItem(id:string){
    this.router.navigate(['/fan/item', id]);
  }
  
  addItem(fan: Fan){
    if(this.userService.isLoggedin){
      const item = new CartItem(fan.id, fan.title, fan.price, 1);
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

private convertToObjectCase(data:any):Fan{
  const caseObj = new Fan(
    data.id,
    data.title,
    data.manufacturer,
    data.size,
    data.dimensions,
    data.cfm,
    data.mtbf,
    data.noise,
    data.price
  );
  return caseObj;
}

private fetchComponents(){
  this.http.get<any[]>('http://localhost:5190/fan')
  .pipe(map(responseData => {
    let postsArray:Fan[] = [];
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
    this.fans = posts;
  });
}
}
