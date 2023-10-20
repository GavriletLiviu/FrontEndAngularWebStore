import { Component, OnInit } from '@angular/core';
import { Cpufanliquid } from './cpufanliquid.model';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-cpufanliquid',
  templateUrl: './cpufanliquid.component.html',
  styleUrls: ['./cpufanliquid.component.css']
})
export class CpufanliquidComponent implements OnInit{

  cpufansliquid : Cpufanliquid[] = []
  
  constructor(private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private userService: UserService) {}

accessItem(id:string){
  this.router.navigate(['/cpufanliquid/item', id]);
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

ngOnInit(): void {
    this.fetchComponents();
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

private fetchComponents(){
  this.http.get<any[]>('http://localhost:5190/cpufanliquid')
  .pipe(map(responseData => {
    let postsArray:Cpufanliquid[] = [];
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
    this.cpufansliquid = posts;
  });
}

}
