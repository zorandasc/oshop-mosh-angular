import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserDatabaseService {
  constructor(private db: AngularFireDatabase) {}

  //U PRINCIPU U OVOJ ALIKACIJI IMAMO dva user objekta:
  //firebase.Usera usera koji nam daje firebase
  //nakon gioole autehntifikacije
  //i nas user u dabaseu, koji je derivet from that firebase.user
  //nas user ima: {name, email, isAdmin}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
