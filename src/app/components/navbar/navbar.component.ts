import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ValidationService} from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.toastr.info('You are now logged out');
    this.router.navigate(['/login']);
    return false;
  }

}
