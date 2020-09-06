import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private route : Router,private socialAuthService : SocialAuthService) { 
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null)
    })

    console.log(" this.loggedIn ",  this.loggedIn);
    
  }

  ngOnInit() {

  }

  goToLogin = () => {
    this.route.navigate(['login'])
  }

  signout = () => {
    this.socialAuthService.signOut();
    this.route.navigate(['login'])
  }
}
