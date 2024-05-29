import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../service/auth.service";
import { authErrorAction, authSuccessAction, loginAction, signUpAction, thirdpartySignUpAction } from "../action/auth.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class AuthEffect
{

    constructor(private action$ : Actions, private authService : AuthService)
    {

    }

    loginEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginAction),
            map(action  => action.request),
            mergeMap(request => this.authService.doLogin(request).pipe(
                map(response => {
                    console.log("response = ", response)
                    return authSuccessAction({response : response});
                    }),
                catchError(err => of(authErrorAction({response : err.error.errorMessage})))
            ) )

        )
    )

    signUpEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(signUpAction),
            map(action  => action.request),
            mergeMap(request => this.authService.doSignUp(request).pipe(
                map(response => {
                    console.log("response = ", response)
                    return authSuccessAction({response : response});
                    }),
                catchError(err => of(authErrorAction({response : err.error.errorMessage})))
            ) )

        )
    )

    thirdpartySignUpEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(thirdpartySignUpAction),
            mergeMap(action => this.authService.doThirdPartySignIn(action.token, action.provider).pipe(
                map(response => {
                    console.log("response = ", response)
                    return authSuccessAction({response : response});
                    }),
                catchError(err => of(authErrorAction({response : err.error.errorMessage})))
            ) )

        )
    )

    authSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(authSuccessAction),
            map(action => action.response),
            tap(response => {
               this.authService.storeAccessTokenAndNavigateToHome(response.accessToken)
            })
        ), {dispatch : false}
    )

}