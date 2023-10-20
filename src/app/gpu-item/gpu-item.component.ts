import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Gpu } from '../gpu/gpu.model';
import { CartService } from '../cart-service';
import { CartItem } from '../cart.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-gpu-item',
  templateUrl: './gpu-item.component.html',
  styleUrls: ['./gpu-item.component.css']
})
export class GpuItemComponent {

  gpuId!: string;
  sGpu!: Gpu;

  gpus:Gpu[] = [];

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.gpuId = params['id'];
          this.fetchItem();
        }
    );
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
  
  
  private fetchItem(){
    let url: string = 'http://localhost:5190/gpu/';
    url += this.gpuId;
    console.log(url);
    this.http.get<any>(url)
      .pipe(map(responseData => {
        let item:Gpu;
        item = this.convertToObjectCase(responseData);
        return item;
      }))
      .subscribe(posts => {
        console.log(posts);
        const scpu = posts;
        if(scpu){
          this.sGpu = scpu;
        }
      })
  }

}
