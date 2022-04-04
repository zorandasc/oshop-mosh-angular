import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  //AKO PRIMJENIMO appUser$() | async UNUTAR NAVBARA RECIMO
  //docice do crASHIRANJA BROWSERA,NIKAKO switchMap sa async pipe
  //ANGULAR CHANGE DECTION CE STVORITI INFINIT LOOP
  //zato u navbaru umijesto async pipe u templateu primjenjujemo
  ///subcribe na appUser$() u navbar componenti da bi dobili appusera
  appUser: AppUser;

  constructor(private auth: AuthService) {
    this.auth.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
