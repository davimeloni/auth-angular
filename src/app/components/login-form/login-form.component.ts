import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ValidationService} from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogIn() {
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.authService.authenticateUser(user)
      .subscribe(data => {
        console.log(data);
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.toastr.success(data.msg);  
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(data.msg);
          this.router.navigate(['/login']);
        }
      });
  }


}
