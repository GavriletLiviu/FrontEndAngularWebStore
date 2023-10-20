import { Component, EventEmitter, Output, Input } from '@angular/core';
import {Category} from './category.model';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Output() categorySelected = new EventEmitter<Category>();
  countCartItems! : number;
  // @Input() category: Category;
  // Categories: {name:string, url: string}[]=[
  //   {name:'case', url: '../../assets/categories/case_final_small.jpg'},
  //   {name:'cpu', url: '../../assets/categories/cpu_final_small.jpg'},
  //   {name:'drive', url: '../../assets/categories/drive_final_small.jpg'},
  //   {name:'gpu', url: '../../assets/categories/gpu_final_small.jpg'},
  //   {name:'motherboard', url: '../../assets/categories/motherboard_final_small.jpg'},
  //   {name:'power', url: '../../assets/categories/power_final_small.jpg'},
  //   {name:'ram', url: '../../assets/categories/ram_final_small.jpg'},
  //   {name:'ssd', url: '../../assets/categories/ssd_final_small.jpg'}
  // ];
  categories: Category[] = [
    new Category('case', '../../assets/categories/case_final_small.jpg'),
    new Category('cpu', '../../assets/categories/cpu_final_small.jpg'),
    new Category('drive', '../../assets/categories/drive_final_small.jpg'),
    new Category('gpu', '../../assets/categories/gpu_final_small.jpg'),
    new Category('motherboard', '../../assets/categories/motherboard_final_small.jpg'),
    new Category('power', '../../assets/categories/power_final_small.jpg'),
    new Category('ram', '../../assets/categories/ram_final_small.jpg'),
    new Category('ssd', '../../assets/categories/ssd_final_small.jpg'),
    new Category('fan', '../../assets/categories/new/fan_small.jpg'),
    new Category('cpufan', '../../assets/categories/new/cpuFan_small.jpg'),
    new Category('cpufanliquid', '../../assets/categories/new/cpuLiquid_small.jpg'),
    new Category('mouse', '../../assets/categories/new/mouse_small.jpg'),
    new Category('keyboard', '../../assets/categories/new/keyboard_small.jpg'),
    new Category('monitor', '../../assets/categories/new/monitor_small.jpg'),
    new Category('speakers', '../../assets/categories/new/speakers_small.jpg'),
    new Category('headphones', '../../assets/categories/new/headphones_small.jpg')
  ];
  onSelect(feature:Category){
    this.categorySelected.emit(feature);
    console.log(feature);
  }


}
