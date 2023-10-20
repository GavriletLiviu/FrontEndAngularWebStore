import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cpu } from '../cpu/cpu.model';
import { CartItem } from '../cart.model';
import { CartService } from '../cart-service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cpu-item',
  templateUrl: './cpu-item.component.html',
  styleUrls: ['./cpu-item.component.css']
})
export class CpuItemComponent {

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

  newItem!: CartItem;
  cpuId!: string;
  sCpu!: Cpu;
    
  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.cpuId = params['id'];
        this.fetchItem();
      }
  );
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
  
  
  private fetchItem(){
    let url: string = 'http://localhost:5190/cpu/';
    url += this.cpuId;
    console.log(url);
    this.http.get<any>(url)
      .pipe(map(responseData => {
        let item:Cpu;
        item = this.convertToObjectCase(responseData);
        return item;
      }))
      .subscribe(posts => {
        console.log(posts);
        const scpu = posts;
        if(scpu){
          this.sCpu = scpu;
        }
      })
  }
}

