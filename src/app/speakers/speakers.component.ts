import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from './speaker.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit{

  speakers: Speaker[] = []
  constructor(private router: Router,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


accessItem(id:string){
  this.router.navigate(['/speakers/item', id]);
}

addItem(speaker: Speaker){
  if(this.userService.isLoggedin){
    const item = new CartItem(speaker.id, speaker.title, speaker.price, 1);
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

private convertToObjectCase(data:any):Speaker{
const caseObj = new Speaker(
  data.id,
  data.title,
  data.manufacturer,
  data.type,
  data.topology,
  data.amplification,
  data.drives,
  data.power,
  data.connectivity,
  data.weight,
  data.price
);
return caseObj;
}

private fetchComponents(){
this.http.get<any[]>('http://localhost:5190/speakers')
.pipe(map(responseData => {
  let postsArray:Speaker[] = [];
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
  this.speakers = posts;
});
}

}
