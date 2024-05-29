import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserClaim } from '../../data/user-claim';
import { Store } from '@ngrx/store';
import { fetchEmployee } from '../../action/home.action';
import { Observable } from 'rxjs';
import { HomeState } from '../../state/home.state';
import { homeSelector } from '../../selector/home.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userClaim : UserClaim
  homeState$ : Observable<HomeState>

  constructor(private authService : AuthService, private store : Store)
  {
    this.userClaim = authService.getUserClaim();
    this.homeState$ = store.select(homeSelector)
  }

  getEmployees()
  {
    this.store.dispatch(fetchEmployee())
  }

}
