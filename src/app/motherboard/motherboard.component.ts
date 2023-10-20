import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Motherboard } from './motherboard.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.css']
})
export class MotherboardComponent implements OnInit{

  motherboards: Motherboard[] = []


  constructor(private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/motherboard/item', id]);
}

addItem(motherboard: Motherboard){
  if(this.userService.isLoggedin){
    const item = new CartItem(motherboard.id, motherboard.title, motherboard.price, 1);
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

private convertToObjectCase(data:any):Motherboard{
const caseObj = new Motherboard(
  data.id,
  data.title,
  data.manufacturer,
  data.cpuSocket,
  data.chipset,
  data.supportedCpu,
  data.memoryType,
  data.memoryCapacity,
  data.memorySlots,
  data.pcieVersion,
  data.audioCodec,
  data.lan,
  data.connectivity,
  data.raidVersions,
  data.sataInterfaces,
  data.pciefullslots,
  data.pcieslots,
  data.m2slots,
  data.technologies,
  data.dimensions,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/motherboard')
.pipe(map(responseData => {
  let postsArray:Motherboard[] = [];
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
  this.motherboards = posts;
});
}

}