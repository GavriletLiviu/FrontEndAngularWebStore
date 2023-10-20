import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Drive } from '../drive/drive.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-drive-item',
  templateUrl: './drive-item.component.html',
  styleUrls: ['./drive-item.component.css']
})
export class DriveItemComponent {
  drives: Drive[] = [];
  driveId!: string;
  sDrive!: Drive;


  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.driveId = params['id'];
          this.fetchItem();
        }
    );
    }

    addItem(drive: Drive){
      if(this.userService.isLoggedin){
        const item = new CartItem(drive.id, drive.title, drive.price, 1);
      this.cartService.addItem(item);
      this.cartService.countItems();
      this.cartService.countTotal();
      const tempcart = JSON.stringify(this.cartService.shoppingCart);
  localStorage.setItem(this.userService.username, tempcart);
      }else{
        alert("Please login first!");
      }
    }

  private convertToObjectCase(data:any):Drive{
    const caseObj = new Drive(
      data.id,
      data.title,
      data.manufacturer,
      data.capacity,
      data.buffer,
      data.conector,
      data.format,
      data.price
    );
    return caseObj;
  }
  
  
  private fetchItem(){
    let url: string = 'http://localhost:5190/drive/';
    url += this.driveId;
    console.log(url);
    this.http.get<any>(url)
      .pipe(map(responseData => {
        let item:Drive;
        item = this.convertToObjectCase(responseData);
        return item;
      }))
      .subscribe(posts => {
        console.log(posts);
        const scpu = posts;
        if(scpu){
          this.sDrive = scpu;
        }
      })
  }
}
