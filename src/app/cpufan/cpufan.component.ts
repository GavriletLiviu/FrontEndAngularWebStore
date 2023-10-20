import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Cpufan } from './cpufan.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cpufan',
  templateUrl: './cpufan.component.html',
  styleUrls: ['./cpufan.component.css']
})
export class CpufanComponent implements OnInit{

  cpufans: Cpufan[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

  accessItem(id:string){
    this.router.navigate(['/cpufan/item', id]);
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

  ngOnInit(): void {
    this.fetchComponents();
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

private fetchComponents(){
  this.http.get<any[]>('http://localhost:5190/cpufan')
  .pipe(map(responseData => {
    let postsArray:Cpufan[] = [];
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
    this.cpufans = posts;
  });
}
}
