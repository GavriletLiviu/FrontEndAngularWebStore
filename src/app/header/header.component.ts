import { Component, OnInit, OnChanges, SimpleChanges, Input, AfterContentChecked, ViewChild } from '@angular/core';
import { CartItem } from '../cart.model';
import { CartService } from '../cart-service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';
import { RegisterUser } from '../registerUser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges , AfterContentChecked{

  constructor(private cartService: CartService,
    private http:HttpClient,
    private userService: UserService) {}

    
  loggedIn: boolean = false;
  username:string = "";

  @ViewChild('login') signupForm!: NgForm;
  @ViewChild('register') registerForm!: NgForm;

  closeLoginOverlay(){
    const loginOverlay = document.querySelector('.login-overlay');
    loginOverlay?.classList.remove('open-overlay');
  }
  showLoginOverlay(){
    const loginOverlay = document.querySelector('.login-overlay');
    loginOverlay?.classList.add('open-overlay');
  }
  closeRegisterOverlay(){
    const registerOverlay = document.querySelector('.register-overlay');
    registerOverlay?.classList.remove('open-overlay');
  }
  showRegisterOverlay(){
    const registerOverlay = document.querySelector('.register-overlay');
    registerOverlay?.classList.add('open-overlay');
  }
  showCartOverlay(){
    const cartOverlay = document.querySelector('.cart-overlay');
    cartOverlay?.classList.add('show');
  }
  closeCartOverlay(){
    const cartOverlay = document.querySelector('.cart-overlay');
    cartOverlay?.classList.remove('show');
  }
  displayAlert(text: string, action: string){
    const alert = document.querySelector('.alert') as HTMLParagraphElement;
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
  }
 
  onLogin(){
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    const user = new User(username, password);
    let url = 'http://localhost:5190/login/';
    url += username + '/' + password;
    let validation = this.http.post<boolean>(url, user)
      .pipe(map(response => response))
      .toPromise().then(validation => {
        if(validation == true){
          this.loggedIn = true;
          this.username = username;
          this.userService.logged(this.loggedIn, this.username);
          console.log(this.userService.isLoggedin);
          console.log(this.userService.username);
          this.closeLoginOverlay();
          const tempcart = localStorage.getItem(username);
          console.log(tempcart);
          if(tempcart){
            this.cartService.shoppingCart = JSON.parse(tempcart);
            this.cartService.countItems();
            this.cartService.countTotal();
          }
        }else{
          alert("Username or password invalid! Try again");
        }
      });
  }

  onRegister(){
    const username = this.registerForm.value.rusername;
    const password = this.registerForm.value.rpassword1;
    const confirmpassword = this.registerForm.value.rpassword2;
    const email = this.registerForm.value.remail;
    const regUser = new RegisterUser(username, email, password, confirmpassword);
    if(password != confirmpassword){
      alert("passwords do not match!");
    }else{
      let url = 'http://localhost:5190/register/';
      url += username + "/" + email + "/" + password + "/" + confirmpassword;
      let validation = this.http.post<boolean>(url, regUser)
        .pipe(map(response=>response))
        .toPromise().then(validation => {
          if(validation){
            this.closeRegisterOverlay();
            this.showLoginOverlay();
          }
        })
    }
  }

  logoutProcedure(){
    this.loggedIn = false;
  }

  cartItems: CartItem[] = [];
  cartAmount: number = 0;
  cartItemsAmount: number = 0;


  ngOnInit(): void {
    this.cartItems = this.cartService.shoppingCart;
    this.cartItemsAmount = this.cartService.count;
    this.cartAmount = this.cartService.total;
  }

  ngOnChanges(changes: SimpleChanges){
    this.cartItems = this.cartService.shoppingCart;
    this.cartItemsAmount = this.cartService.count;
    this.cartAmount = this.cartService.total;
  }

  ngAfterContentChecked(): void {
    this.cartItems = this.cartService.shoppingCart;
    this.cartItemsAmount = this.cartService.count;
    this.cartAmount = this.cartService.total;
  }

  increase(cartitem:CartItem){
    this.cartService.increaseQuantity(cartitem);
    this.cartService.countItems();
    this.cartService.countTotal();
    this.cartItemsAmount = this.cartService.count;
    this.cartAmount = this.cartService.total;
  }
  decrease(cartitem:CartItem){
    this.cartService.decreaseQuantity(cartitem);
    this.cartService.countItems();
    this.cartService.countTotal();
    this.cartItemsAmount = this.cartService.count;
    this.cartAmount = this.cartService.total;
  }
}
