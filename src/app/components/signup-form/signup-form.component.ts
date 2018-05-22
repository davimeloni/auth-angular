import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {ValidationService} from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validationService: ValidationService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router
            ) {
             }

  ngOnInit() {
    
  }

  onSignUp() {

    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required fields
    if (!this.validationService.validateSignUp(user)) {
      //console.log('Please fill in all fields');
      this.toastr.error('Please fill in all fields', 'Error');
      return false;
    }

    // Validate email
    if (!this.validationService.validateEmail(user.email)) {
      //console.log('Please use a valide email');
      this.toastr.error('Please use a valide email.', 'Error');
      return false;
    }

    this.authService.signUpUser(user)
      .subscribe(data => {
        if(data.success) {
          this.toastr.success('You are now registered and can log in', 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Something went wrong', 'Error');
          this.router.navigate(['/signup']);
        }
      })

  }

}
