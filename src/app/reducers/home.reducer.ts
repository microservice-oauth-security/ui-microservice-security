import { createReducer, on } from "@ngrx/store";
import { HomeState } from "../state/home.state";
import { fetchEmployee, fetchEmployeeError, fetchEmployeeSuccess } from "../action/home.action";

const initiatState : HomeState = {employees : [], error :''}

export const homeReducer = createReducer(initiatState,
    on(fetchEmployee, state => ({...state, error : '', employees : []})),
    on(fetchEmployeeSuccess, (state, {response})  => ({...state, employees : response, error : ''})),
    on(fetchEmployeeError, (state, {response}) => ({...state, employees:[], error : response}))
)