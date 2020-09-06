import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private socialAuthService : SocialAuthService, private route : Router) { }

  ngOnInit() {
     
  }

  signInWithFB = () => {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    setTimeout(()=>{
      this.check()
    },1000)
  }

  check(){
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if(user != null){
        this.route.navigate(['home'])
      }
    })
  }

  signout = () => {
    this.socialAuthService.signOut();
  }



}
