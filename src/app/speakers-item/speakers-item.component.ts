import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Speaker } from '../speakers/speaker.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-speakers-item',
  templateUrl: './speakers-item.component.html',
  styleUrls: ['./speakers-item.component.css']
})
export class SpeakersItemComponent {
  speakersId!: string;
  sSpeaker!: Speaker;

  speakers: Speaker[] = []

  
  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService:UserService) {}


    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.speakersId = params['id'];
          this.fetchItem();
        }
    );
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

private fetchItem(){
  let url: string = 'http://localhost:5190/speakers/';
  url += this.speakersId;
  console.log(url);
  this.http.get<any>(url)
    .pipe(map(responseData => {
      let item:Speaker;
      item = this.convertToObjectCase(responseData);
      return item;
    }))
    .subscribe(posts => {
      console.log(posts);
      const scpu = posts;
      if(scpu){
        this.sSpeaker = scpu;
      }
    })
}
}
