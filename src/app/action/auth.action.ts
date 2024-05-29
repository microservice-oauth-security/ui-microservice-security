import { createAction, props } from "@ngrx/store";
import { AuthRequest } from "../data/request/auth.request";
import { AuthResponse } from "../data/response/auth.response";

export const loginAction = createAction('[Login]',props<{request : AuthRequest}>())
export const signUpAction = createAction('[SignUp]',props<{request : AuthRequest}>())
export const thirdpartySignUpAction = createAction('[ThirdPartySignUp]',props<{token : string, provider : string}>())
export const authSuccessAction = createAction('[Auth] - Success', props<{response : AuthResponse}>())
export const authErrorAction= createAction('[Auth] - Error', props<{response : any}>())