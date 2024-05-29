import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HomeService } from "../service/home.service";
import { fetchEmployee, fetchEmployeeError, fetchEmployeeSuccess } from "../action/home.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class HomeEffect
{

    constructor(private action$ : Actions, private homeService : HomeService)
    {

    }

    fetchEmployeeEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchEmployee),
            mergeMap(() => this.homeService.getEmployees().pipe(
                map(response => 
                    { 
                        console.log("response = ", response)
                        return fetchEmployeeSuccess({response :response}); 
                    } ),
                catchError(err => of(fetchEmployeeError({response : err.error.errorMessage})))
            ))

        )
    )


}