export class RegisterUser{
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    constructor(username: string, email: string, password: string, confirmpassword: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmpassword = confirmpassword;
    }
}