import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Power } from './power.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit{


  powers: Power[] = []

 
  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/power/item', id]);
}
addItem(power: Power){
  if(this.userService.isLoggedin){
    const item = new CartItem(power.id, power.title, power.price, 1);
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

private convertToObjectCase(data:any):Power{
const caseObj = new Power(
  data.id,
  data.title,
  data.manufacturer,
  data.maxPower,
  data.connectorSata,
  data.connectorPeripherial,
  data.connectorMotherboard,
  data.connectorCpu,
  data.connectorPcie6,
  data.connectorPcie8,
  data.format,
  data.modularity,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/power')
.pipe(map(responseData => {
  let postsArray:Power[] = [];
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
  this.powers = posts;
});
}

}
