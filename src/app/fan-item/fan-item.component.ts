import { Fan } from '../fan/fan.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-fan-item',
  templateUrl: './fan-item.component.html',
  styleUrls: ['./fan-item.component.css']
})
export class FanItemComponent {

  fanId!: string;
  sFan!: Fan;

  fans: Fan[] = []

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}

    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.fanId = params['id'];
          this.fetchItem();
        }
    );
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
  
  
  private fetchItem(){
    let url: string = 'http://localhost:5190/fan/';
    url += this.fanId;
    console.log(url);
    this.http.get<any>(url)
      .pipe(map(responseData => {
        let item:Fan;
        item = this.convertToObjectCase(responseData);
        return item;
      }))
      .subscribe(posts => {
        console.log(posts);
        const scpu = posts;
        if(scpu){
          this.sFan = scpu;
        }
      })
  }
}
