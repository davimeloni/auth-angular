import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  address: String;
  amount: Number;
  networks = [
    "Network1",
    "Network2",
    "Network3",
    "Network4"
  ];
  network = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserProfile();
   }

  getUserProfile() {
    this.authService.getProfile()
      .subscribe(data => {
        console.log(data);
        this.user = data.user;
      });
  }

  buyTokens() {
    const userData = this.user;
    userData.network = this.network;
    userData.address = this.address;
    userData.balance = userData.balance + this.amount;
    console.log(userData);

    //this.dialogRef = this.dialog.open(DialogComponent);

    this.authService.buyYLM(userData)
      .subscribe(res => {
        console.log(res);
        this.network = '';
        this.address = '';
        this.amount = null;
      });
      
  }

}


