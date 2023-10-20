import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Power } from '../power/power.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-power-item',
  templateUrl: './power-item.component.html',
  styleUrls: ['./power-item.component.css']
})
export class PowerItemComponent {
  powerId!: string;
  sPower!: Power;

  powers: Power[] = [];
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}



    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.powerId = params['id'];
          this.fetchItem();
        }
    );
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


private fetchItem(){
  let url: string = 'http://localhost:5190/power/';
  url += this.powerId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Power;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sPower = scpu;
      }
    })
}
}
