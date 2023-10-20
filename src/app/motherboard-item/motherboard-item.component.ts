import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Motherboard } from '../motherboard/motherboard.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-motherboard-item',
  templateUrl: './motherboard-item.component.html',
  styleUrls: ['./motherboard-item.component.css']
})
export class MotherboardItemComponent {
  motherboardId!: string;
  sMotherboard!: Motherboard;

  motherboards: Motherboard[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.motherboardId = params['id'];
          this.fetchItem();
        }
    );
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


private fetchItem(){
  let url: string = 'http://localhost:5190/motherboard/';
  url += this.motherboardId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Motherboard;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sMotherboard = scpu;
      }
    })
}
  
}
