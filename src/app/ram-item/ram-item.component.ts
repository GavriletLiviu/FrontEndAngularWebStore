import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ram } from '../ram/ram.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ram-item',
  templateUrl: './ram-item.component.html',
  styleUrls: ['./ram-item.component.css']
})
export class RamItemComponent {
  ramId!: string;
  sRam!: Ram;

  rams: Ram[] = [];

  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}



    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.ramId = params['id'];
          this.fetchItem();
        }
    );
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

private fetchItem(){
  let url: string = 'http://localhost:5190/ram/';
  url += this.ramId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Ram;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sRam = scpu;
      }
    })
}
}
