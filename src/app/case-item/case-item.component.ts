import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Case } from '../case/case.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-case-item',
  templateUrl: './case-item.component.html',
  styleUrls: ['./case-item.component.css']
})
export class CaseItemComponent implements OnInit{
  caseId!: string;
  sCase!: Case;
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

ngOnInit(){

  this.route.params
    .subscribe(
      (params: Params) => {
        this.caseId = params['id'];
        this.fetchItem();
      }
  );
}

addItem(computercase: Case){
  if(this.userService.isLoggedin){
    const item = new CartItem(computercase.id, computercase.title, computercase.price, 1);
  this.cartService.addItem(item);
  this.cartService.countItems();
  this.cartService.countTotal();
  const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
  }else{
    alert("Please login first!");
  }
}

private convertToObjectCase(data:any):Case{
  const caseObj = new Case(
    data.id,
    data.title,
    data.manufacturer,
    data.fans,
    data.type,
    data.frontInputs,
    data.dimensions,
    data.motherboardFormat,
    data.color,
    data.weight,
    data.includedFans,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/computercase/';
  url += this.caseId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Case;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scase = posts;
      if(scase){
        this.sCase = scase;
      }
    })
}
  
}
