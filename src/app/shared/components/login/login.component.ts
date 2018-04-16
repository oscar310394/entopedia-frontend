import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  userExist: boolean;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    this.loginService.doLogin(this.email, this.password)
      .subscribe(res => {
        let data = res.json();
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/principal');
      });
  }


}