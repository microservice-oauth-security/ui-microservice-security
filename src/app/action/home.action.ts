import { createAction, props } from "@ngrx/store";
import { EmployeeResponse } from "../data/response/employee.response";

export const fetchEmployee = createAction('[Employee] Fetch');
export const fetchEmployeeSuccess = createAction('[Employee] Fetch Success',props<{response : EmployeeResponse[]}>())
export const fetchEmployeeError = createAction('[Employee] Fetch Error',props<{response : any}>())