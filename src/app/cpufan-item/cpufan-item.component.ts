import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cpufan } from '../cpufan/cpufan.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cpufan-item',
  templateUrl: './cpufan-item.component.html',
  styleUrls: ['./cpufan-item.component.css']
})
export class CpufanItemComponent {

  cpufanId!: string;
  sCpufan!: Cpufan;
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

  cpufans: Cpufan[] = []

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.cpufanId = params['id'];
        this.fetchItem();
      }
  );
  }

  addItem(cpufan: Cpufan){
    if(this.userService.isLoggedin){
      const item = new CartItem(cpufan.id, cpufan.title, cpufan.price, 1);
    this.cartService.addItem(item);
    this.cartService.countItems();
    this.cartService.countTotal();
    const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
    }else{
      alert("Please login first!");
    }
  }

private convertToObjectCase(data:any):Cpufan{
  const caseObj = new Cpufan(
    data.id,
    data.title,
    data.manufacturer,
    data.socket,
    data.fanSpeed,
    data.cfm,
    data.noise,
    data.weight,
    data.dimensions,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/cpufan/';
  url += this.cpufanId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Cpufan;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpufan = posts;
      if(scpufan){
        this.sCpufan = scpufan;
      }
    })
}
}
