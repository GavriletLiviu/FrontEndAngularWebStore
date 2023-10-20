import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Gpu } from './gpu.model';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gpu',
  templateUrl: './gpu.component.html',
  styleUrls: ['./gpu.component.css']
})
export class GpuComponent implements OnInit{

  gpus:Gpu[] = []

  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}

accessItem(id:string){
  this.router.navigate(['/gpu/item', id]);
}
addItem(gpu: Gpu){
  if(this.userService.isLoggedin){
    const item = new CartItem(gpu.id, gpu.title, gpu.price, 1);
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

private convertToObjectCase(data:any):Gpu{
const caseObj = new Gpu(
  data.id,
  data.title,
  data.manufacturer,
  data.slot,
  data.processor,
  data.cores,
  data.technologies,
  data.series,
  data.processorFrequency,
  data.memorySize,
  data.memoryType,
  data.memoryBusSize,
  data.directX,
  data.openGL,
  data.displayPorts,
  data.hdmiPorts,
  data.vgaPorts,
  data.dviPorts,
  data.powerPorts,
  data.power,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/gpu')
.pipe(map(responseData => {
  let postsArray:Gpu[] = [];
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
  this.gpus = posts;
});
}

public filter(event:Event, category:string, value:string){
  const checkbox = event.target as HTMLInputElement;
  if(checkbox.checked){
    switch(category){
      case 'manufacturer':
        this.gpus = this.gpus.filter(c=>c.manufacturer == value);
        break;
      case 'processor':
        this.gpus = this.gpus.filter(c=>c.processor == value);
        break;
      case 'memorySize':
        this.gpus = this.gpus.filter(c=>c.memorySize == value);
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

}




