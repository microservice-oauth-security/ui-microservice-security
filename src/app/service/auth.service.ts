import { Injectable } from "@angular/core";
import { AuthRequest } from "../data/request/auth.request";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "../data/response/auth.response";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserClaim } from "../data/user-claim";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService
{

    accessTokeKey : string = 'accessTokeKey'

   constructor(private httpClient : HttpClient, private router : Router)
   {

   }

   doLogin(request : AuthRequest) : Observable<AuthResponse>
   {
       return this.httpClient.post<AuthResponse>("http://localhost:8081/user-auth/login", request);
   }

   doSignUp(request : AuthRequest) : Observable<AuthResponse>
   {
       return this.httpClient.post<AuthResponse>("http://localhost:8081/user-auth/sign-in", request);
   }

   doThirdPartySignIn(token : string, provider : string) : Observable<AuthResponse>
   {
       return this.httpClient.post<AuthResponse>("http://localhost:8081/user-auth/3p/sign-in", {provider : provider},
       {
        headers : { 
            Authorization : 'Bearer '+ token
          }
        }
       );
   }

   storeAccessTokenAndNavigateToHome(accessToken : string)
   {
        sessionStorage.setItem(this.accessTokeKey, accessToken)
        this.router.navigate(["/"])
   }

   getAccessToken() : any{
    return sessionStorage.getItem(this.accessTokeKey)
   }

   getUserClaim() : UserClaim
   {
        let userClaim = {} as UserClaim;
        let token = this.getAccessToken()
        if(token)
        {
            let decodedToken =  new JwtHelperService().decodeToken(token)
            userClaim = {userName : decodedToken['user-name'], authorities : decodedToken['authorities']}
        }
        return userClaim
   }

   checkAccessTokenAndLogout() : boolean
   {
    let accessToken = this.getAccessToken();
    if(accessToken && ! this.isTokenExpired())
    {
        return true;
    }else{
        this.router.navigate(["/auth"])
        return false
    }
   }

   checkAccessTokenAndLogin() : boolean
   {
    let accessToken = this.getAccessToken();
    if(accessToken && ! this.isTokenExpired())
    {
        this.router.navigate(["/"])
        return false;
    }else{
        return true;
    }
   }

   isTokenExpired() : boolean
   {
        let token = this.getAccessToken()
        if(token)
        {
            let decodedToken =  new JwtHelperService().decodeToken(token)
            let expTimeInSec = decodedToken.exp;
            let curentTimeInsec = Math.floor(Date.now() / 1000)
            return expTimeInSec - curentTimeInsec > 60 ? false : true;
        }
        return true;
    }

}