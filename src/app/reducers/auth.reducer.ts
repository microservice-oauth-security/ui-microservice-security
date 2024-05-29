import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../state/auth.state";
import { authErrorAction, authSuccessAction, loginAction, signUpAction } from "../action/auth.action";


const initialState : AuthState = {error : ''}

export const authReducer = createReducer(
    initialState,
    on(loginAction, state => ({...state, error : ''})),
    on(signUpAction, state => ({...state, error : ''})),
    on(authSuccessAction,state => ({...state, error : ''})),
    on(authErrorAction,(state, {response}) => ({...state, error : response})),
)