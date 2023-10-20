import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Cpu } from './cpu.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit{


cpus: Cpu[]=[]

constructor(private router: Router,
  private cartService: CartService,
  private http: HttpClient,
  private userService: UserService) {}

newItem!: CartItem;

accessItem(id:string){
  this.router.navigate(['/cpu/item', id]);
}

addItem(cpu: Cpu){
  if(this.userService.isLoggedin){
    const item = new CartItem(cpu.id, cpu.title, cpu.price, 1);
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

private convertToObjectCase(data:any):Cpu{
  const caseObj = new Cpu(
    data.id,
    data.manufacturer,
    data.title,
    data.family,
    data.socket,
    data.baseFrequency,
    data.boostFrequency,
    data.cores,
    data.cacheL1,
    data.cacheL3,
    data.tdp,
    data.price
  );
  return caseObj;
}

private fetchComponents(){
  this.http.get<any[]>('http://localhost:5190/cpu')
  .pipe(map(responseData => {
    let postsArray:Cpu[] = [];
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
    this.cpus = posts;
  });
}

public filter(event:Event, category:string, value:string){
  const checkbox = event.target as HTMLInputElement;
  if(checkbox.checked){
    switch(category){
      case 'manufacturer':
        this.cpus = this.cpus.filter(c=>c.manufacturer == value);
        break;
      case 'cores':
        this.cpus = this.cpus.filter(c=>c.cores == value);
        break;
      case 'socket':
        this.cpus = this.cpus.filter(c=>c.socket == value);
    }    
  }
}

public resetFilters(){
  const checkboxes = document.querySelectorAll('.company-btn') as NodeListOf<HTMLInputElement>;
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  this.fetchComponents();
  console.log(this.cpus);
}

}
