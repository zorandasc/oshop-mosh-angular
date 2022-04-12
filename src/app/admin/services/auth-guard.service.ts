import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) return true;

        this.router.navigate(['/login'], {
          //ako korisnik pokusa na protected route (url) a nije logovan
          //ta informacije ce biti sacuvana u state.url
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
