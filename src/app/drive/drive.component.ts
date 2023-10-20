import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Drive } from './drive.model';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit{
  drives: Drive[] = [];


  constructor(private router: Router,
    private cartService: CartService,
    private http :HttpClient,
    private userService: UserService) {}


  accessItem(id:string){
    this.router.navigate(['/drive/item', id]);
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

  ngOnInit(): void {
      this.fetchComponents();
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
  
  private fetchComponents(){
    this.http.get<any[]>('http://localhost:5190/drive')
    .pipe(map(responseData => {
      let postsArray:Drive[] = [];
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
      this.drives = posts;
    });
  }
  
}
