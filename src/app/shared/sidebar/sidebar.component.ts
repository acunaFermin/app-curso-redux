import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  nombreUser:string = '';
  storeSubs!:Subscription;

  constructor(
    private authService:AuthService,
    private router: Router,
    private store: Store<AppState>
  ){
    this.storeSubs =  this.store.select('user').subscribe(({user}) => {
      this.nombreUser = user?.nombre!
    })
  }
  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

  cerrarSesion(){
    this.authService.cerrarSesion()
    .then(resp => {
      this.router.navigateByUrl('/login')
    })
    .catch(console.error)
  }
}
