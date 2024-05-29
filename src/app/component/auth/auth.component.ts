import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction, signUpAction, thirdpartySignUpAction } from '../../action/auth.action';
import { AuthRequest } from '../../data/request/auth.request';
import { Observable } from 'rxjs';
import { AuthState } from '../../state/auth.state';
import { authSelector } from '../../selector/auth.selector';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  hideLogin : boolean = false;

  authState$ : Observable<AuthState>;

  loginForm = this.formBuilder.group(
    {
      userName : ['', Validators.required],
      password :  ['', Validators.required]
    }
  )

  signUpForm = this.formBuilder.group(
    {
      userName : ['', Validators.required],
      password :  ['', Validators.required],
      confirmPassword : ['', Validators.required],
    },
     {
      validators : [(control) => {
        return  (!control.value.confirmPassword || (control.value.confirmPassword === control.value.password)) ? null : {passwordNoMatch : true };
      }]
     }
  )

  constructor(private formBuilder : FormBuilder, private store : Store, private socialAuthService: SocialAuthService)
  {
    this.authState$ = store.select(authSelector)
  }

  ngOnInit()
  {
      this.socialAuthService.authState.subscribe(userDetail  => 
        {
        console.log("userDetail" , userDetail);
        this.store.dispatch(thirdpartySignUpAction({token : userDetail.idToken , provider : userDetail.provider}));
        }
       )
  }

  onLoginSubmit()
  {
      if(this.loginForm.valid)
      {
          let authRequest = {userName : this.loginForm.value.userName, password : this.loginForm.value.password} as AuthRequest
          this.store.dispatch(loginAction({request : authRequest}))
      }else{
        alert("Invalid Form")
      }
  }

  onSignUpSubmit()
  {
    if(this.signUpForm.valid)
      {
        let authRequest = {userName : this.signUpForm.value.userName, password : this.signUpForm.value.password} as AuthRequest
        this.store.dispatch(signUpAction({request : authRequest}))
      }else{
        alert("Invalid Form")
      }
  }

}
