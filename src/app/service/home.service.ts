import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeResponse } from "../data/response/employee.response";
import { AuthService } from "./auth.service";

@Injectable()
export class HomeService
{
    constructor(private httpClient : HttpClient, private authService: AuthService)
    {

    }

    getEmployees() : Observable<EmployeeResponse[]>
    {
        return this.httpClient.get<EmployeeResponse[]>("http://localhost:8082/demo-service/employee",
        {
            headers : {
              Authorization : 'Bearer '+ this.authService.getAccessToken()
            }
          }
        )
    }
}