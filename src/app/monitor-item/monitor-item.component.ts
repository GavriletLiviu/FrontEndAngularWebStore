import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Monitor } from '../monitor/monitor.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.css']
})
export class MonitorItemComponent {
  monitorId!: string;
  sMonitor!: Monitor;

  monitors: Monitor[] = []
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}



    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.monitorId = params['id'];
          this.fetchItem();
        }
    );
    }

    addItem(monitor: Monitor){
      if(this.userService.isLoggedin){
        const item = new CartItem(monitor.id, monitor.title, monitor.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

private convertToObjectCase(data:any):Monitor{
  const caseObj = new Monitor(
    data.id,
    data.title,
    data.manufacturer,
    data.size,
    data.resolution,
    data.refresh,
    data.response,
    data.ports,
    data.format,
    data.price
  );
  return caseObj;
}


private fetchItem(){
  let url: string = 'http://localhost:5190/monitor/';
  url += this.monitorId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Monitor;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sMonitor = scpu;
      }
    })
}
}
