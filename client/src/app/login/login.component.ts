import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private socialAuthService : SocialAuthService) { }

  ngOnInit() {
      this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null)
      })
  }

  signInWithFB = () => {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  signout = () => {
    this.socialAuthService.signOut();
  }



}
