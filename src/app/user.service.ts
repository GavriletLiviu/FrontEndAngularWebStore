import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user.model';

@Injectable()

export class UserService{
    isLoggedin:boolean = false;
    username:string="";

    logged(isLogged:boolean, username:string){
        this.isLoggedin = true;
        this.username = username;
    }
}