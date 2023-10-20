import { Component } from '@angular/core';
import { Cpufanliquid } from '../cpufanliquid/cpufanliquid.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cpufanliquid-item',
  templateUrl: './cpufanliquid-item.component.html',
  styleUrls: ['./cpufanliquid-item.component.css']
})
export class CpufanliquidItemComponent {
  cpufanliquidId!: string;
  sCpufanliquid!: Cpufanliquid;
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

  cpufansliquid : Cpufanliquid[] = [];


  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.cpufanliquidId = params['id'];
        this.fetchItem();
      }
  );
  }

  addItem(cpufan: Cpufanliquid){
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

private convertToObjectCase(data:any):Cpufanliquid{
  const caseObj = new Cpufanliquid(
    data.id,
    data.title,
    data.manufacturer,
    data.size,
    data.socket,
    data.fanSpeed,
    data.pumpSpeed,
    data.noise,
    data.weight,
    data.dimensions,
    data.fanLed,
    data.waterblockLed,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/cpufanliquid/';
  url += this.cpufanliquidId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Cpufanliquid;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpufanliquid = posts;
      if(scpufanliquid){
        this.sCpufanliquid = scpufanliquid;
      }
    })
}

}
