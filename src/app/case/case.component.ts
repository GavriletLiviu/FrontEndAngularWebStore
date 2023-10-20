import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from './case.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit{

  cases: Case[] = [];
  //   new Case('CSLIANLIO11DYNAMICXLROG', 'O11 Dynamic XL', 'Lian Li', '10 x 120mm', 'Full Tower', '1xUsb 3.1TypeC, 4xUsb3.0, 1xHDAudio', '285x513x471mm', 'ATX, microATX, ExtendedATX, ITX', 'black', '13.75', 0, 1422),
  //   new Case('CSLIANLILANCOOL215', 'Lancool 215', 'Lian Li', '7 x 120mm or 4 x 140mm / 2 x 120mm', 'Middle Tower', '2xUsb3.0, 1xHDAudio, 1xLed Control', '215x482x462mm', 'ATX, microATX, extendedATX, ITX', 'black', '8kg', 3, 585)
  // ];


  constructor(private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private userService: UserService) {}


accessItem(id:string){
  this.router.navigate(['/case/item', id]);
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

private fetchComponents(){
  this.http.get<any[]>('http://localhost:5190/computercase')
  .pipe(map(responseData => {
    let postsArray:Case[] = [];
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
    this.cases = posts;
  });
}

public filter(event:Event, category:string, value:string){
  const checkbox = event.target as HTMLInputElement;
  if(checkbox.checked){
    switch(category){
      case 'manufacturer':
        this.cases = this.cases.filter(c=>c.manufacturer == value);
        break;
      case 'includedFans':
        this.cases = this.cases.filter(c=>c.includedFans == value);
    }    
  }
}

public resetFilters(){
  const checkboxes = document.querySelectorAll('.company-btn') as NodeListOf<HTMLInputElement>;
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  this.fetchComponents();
}

ngOnInit(): void {
    this.fetchComponents();
}

}
