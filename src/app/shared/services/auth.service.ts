import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute /*Router*/, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserDatabaseService } from './user-database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //ovo je user dobijen poslije google logovanaj
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserDatabaseService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    //sacuvaj return url to local storage
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        console.log('You have been successfully logged in!');
        //this.router.navigateByUrl(returnUrl);
      })
      .catch((error) => console.log(error));
  }

  logout() {
    this.afAuth
      .signOut()
      .then((result) => {
        console.log('You have been successfully logged out!');
        this.router.navigateByUrl('/');
      })
      .catch((error) => console.log(error));
  }

  //conver firebase user to our dataabse user
  //i umjesto Observable(firebase.user) vrati Observable(Appuser)
  //switchMap
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        return user ? this.userService.get(user.uid) : of(null);
      })
    );
  }

  //AKO PRIMJENIMO appUser$() | async UNUTAR NAVBARA RECIMO
  //docice do crASHIRANJA BROWSERA,NIKAKO switchMap sa async pipe
  //ANGULAR CHANGE DECTION CE STVORITI INFINIT LOOP
  //zato u navbaru umijesto async pipe u templateu primjenjujemo
  ///subcribe na appUser$() u navbar componenti da bi dobili appusera
}
