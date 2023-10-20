import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ssd } from '../ssd/ssd.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ssd-item',
  templateUrl: './ssd-item.component.html',
  styleUrls: ['./ssd-item.component.css']
})
export class SsdItemComponent {
  ssdId!: string;
  sSsd!: Ssd;

  ssds: Ssd[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.ssdId = params['id'];
          this.fetchItem();
        }
    );
    }
    addItem(ssd: Ssd){
      if(this.userService.isLoggedin){
        const item = new CartItem(ssd.id, ssd.title, ssd.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

private convertToObjectCase(data:any):Ssd{
  const caseObj = new Ssd(
    data.id,
    data.title,
    data.manufacturer,
    data.capacity,
    data.connector,
    data.cache,
    data.memoryType,
    data.formFactor,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/ssd/';
  url += this.ssdId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Ssd;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sSsd = scpu;
      }
    })
}
}
