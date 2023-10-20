import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { SsdComponent } from './ssd/ssd.component';
import { RamComponent } from './ram/ram.component';
import { PowerComponent } from './power/power.component';
import { MotherboardComponent } from './motherboard/motherboard.component';
import { GpuComponent } from './gpu/gpu.component';
import { DriveComponent } from './drive/drive.component';
import { CpuComponent } from './cpu/cpu.component';
import { CaseComponent } from './case/case.component';
import { CategoriesDirectiveDirective } from './categories-directive.directive';
import { ShowDialogueDirective } from './show.directive';
import { CpuItemComponent } from './cpu-item/cpu-item.component';
import { CaseItemComponent } from './case-item/case-item.component';
import { DriveItemComponent } from './drive-item/drive-item.component';
import { GpuItemComponent } from './gpu-item/gpu-item.component';
import { MotherboardItemComponent } from './motherboard-item/motherboard-item.component';
import { PowerItemComponent } from './power-item/power-item.component';
import { SsdItemComponent } from './ssd-item/ssd-item.component';
import { RamItemComponent } from './ram-item/ram-item.component';
import { FanComponent } from './fan/fan.component';
import { FanItemComponent } from './fan-item/fan-item.component';
import { CpufanComponent } from './cpufan/cpufan.component';
import { CpufanItemComponent } from './cpufan-item/cpufan-item.component';
import { CpufanliquidComponent } from './cpufanliquid/cpufanliquid.component';
import { CpufanliquidItemComponent } from './cpufanliquid-item/cpufanliquid-item.component';
import { MouseComponent } from './mouse/mouse.component';
import { MouseItemComponent } from './mouse-item/mouse-item.component';
import { KeyboardItemComponent } from './keyboard-item/keyboard-item.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorItemComponent } from './monitor-item/monitor-item.component';
import { SpeakersItemComponent } from './speakers-item/speakers-item.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { HeadphonesItemComponent } from './headphones-item/headphones-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartItem } from './cart.model';
import { CartService } from './cart-service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';

const appRoutes: Routes = [
  {path:'case', component:CaseComponent},
  {path:'case/item/:id', component:CaseItemComponent},
  {path:'cpu', component:CpuComponent},
  {path:'cpu/item/:id', component:CpuItemComponent},
  {path:'cpufan', component:CpufanComponent},
  {path:'cpufan/item/:id', component:CpufanItemComponent},
  {path:'cpufanliquid', component:CpufanliquidComponent},
  {path:'cpufanliquid/item/:id', component:CpufanliquidItemComponent},
  {path:'drive', component:DriveComponent},
  {path:'drive/item/:id', component:DriveItemComponent},
  {path:'fan', component:FanComponent},
  {path:'fan/item/:id', component:FanItemComponent},
  {path:'gpu', component:GpuComponent},
  {path:'gpu/item/:id', component:GpuItemComponent},
  {path:'headphones', component:HeadphonesComponent},
  {path:'headphones/item/:id', component:HeadphonesItemComponent},
  {path:'keyboard', component:KeyboardComponent},
  {path:'keyboard/item/:id', component:KeyboardItemComponent},
  {path:'monitor', component:MonitorComponent},
  {path:'monitor/item/:id', component:MonitorItemComponent},
  {path:'motherboard', component:MotherboardComponent},
  {path:'motherboard/item/:id', component:MotherboardItemComponent},
  {path:'mouse', component:MouseComponent},
  {path:'mouse/item/:id', component:MouseItemComponent},
  {path:'power', component:PowerComponent},
  {path:'power/item/:id', component:PowerItemComponent},
  {path:'ram', component:RamComponent},
  {path:'ram/item/:id', component:RamItemComponent},
  {path:'speakers', component:SpeakersComponent},
  {path:'speakers/item/:id', component:SpeakersItemComponent},
  {path:'ssd', component:SsdComponent},
  {path:'ssd/item/:id', component:SsdItemComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    SsdComponent,
    RamComponent,
    PowerComponent,
    MotherboardComponent,
    GpuComponent,
    DriveComponent,
    CpuComponent,
    CaseComponent,
    CategoriesDirectiveDirective,
    ShowDialogueDirective,
    CpuItemComponent,
    CaseItemComponent,
    DriveItemComponent,
    GpuItemComponent,
    MotherboardItemComponent,
    PowerItemComponent,
    SsdItemComponent,
    RamItemComponent,
    FanComponent,
    FanItemComponent,
    CpufanComponent,
    CpufanItemComponent,
    CpufanliquidComponent,
    CpufanliquidItemComponent,
    MouseComponent,
    MouseItemComponent,
    KeyboardItemComponent,
    KeyboardComponent,
    MonitorComponent,
    MonitorItemComponent,
    SpeakersItemComponent,
    SpeakersComponent,
    HeadphonesComponent,
    HeadphonesItemComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [CartService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
