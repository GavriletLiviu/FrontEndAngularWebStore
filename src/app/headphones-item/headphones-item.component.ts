import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Headphone } from '../headphones/headphones.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-headphones-item',
  templateUrl: './headphones-item.component.html',
  styleUrls: ['./headphones-item.component.css']
})
export class HeadphonesItemComponent {
  headphoneId!: string;
  sHeadphone!: Headphone;

  headphones: Headphone[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}



    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.headphoneId = params['id'];
          this.fetchItem();
        }
    );
    }
    addItem(headphone: Headphone){
      if(this.userService.isLoggedin){
        const item = new CartItem(headphone.id, headphone.title, headphone.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

private convertToObjectCase(data:any):Headphone{
  const caseObj = new Headphone(
    data.id,
    data.title,
    data.manufacturer,
    data.connectivity,
    data.impedance,
    data.microphone,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/headphones/';
  url += this.headphoneId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Headphone;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sHeadphone = scpu;
      }
    })
}

}
