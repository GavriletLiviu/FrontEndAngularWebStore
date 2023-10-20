import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monitor } from './monitor.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit{

  monitors: Monitor[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http :HttpClient,
    private userService: UserService) {}


accessItem(id:string){
  this.router.navigate(['/monitor/item', id]);
}

addItem(monitor: Monitor){
  if(this.userService.isLoggedin){
    const item = new CartItem(monitor.id, monitor.title, monitor.price, 1);
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

private convertToObjectCase(data:any):Monitor{
const caseObj = new Monitor(
  data.id,
  data.title,
  data.manufacturer,
  data.size,
  data.resolution,
  data.refresh,
  data.response,
  data.ports,
  data.format,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/monitor')
.pipe(map(responseData => {
  let postsArray:Monitor[] = [];
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
  this.monitors = posts;
});
}
}
