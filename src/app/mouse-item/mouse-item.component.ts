import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Mouse } from '../mouse/mouse.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mouse-item',
  templateUrl: './mouse-item.component.html',
  styleUrls: ['./mouse-item.component.css']
})
export class MouseItemComponent {
  mouseId!: string;
  sMouse!: Mouse;

  mice: Mouse[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}



    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.mouseId = params['id'];
          this.fetchItem();
        }
    );
    }
    addItem(mouse: Mouse){
      if(this.userService.isLoggedin){
        const item = new CartItem(mouse.id, mouse.title, mouse.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

private convertToObjectCase(data:any):Mouse{
  const caseObj = new Mouse(
    data.id,
    data.title,
    data.manufacturer,
    data.connection,
    data.sensor,
    data.resolution,
    data.buttons,
    data.weight,
    data.dimensions,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/mouse/';
  url += this.mouseId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Mouse;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sMouse = scpu;
      }
    })
}
}