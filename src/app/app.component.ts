import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserDatabaseService } from './shared/services/user-database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping';

  constructor(
    private auth: AuthService,
    private userService: UserDatabaseService,
    router: Router
  ) {
    //kada se user loguje
    this.auth.user$.subscribe((user) => {
      if (!user) return;

      //sacuvaj user objekat to firestore db
      this.userService.save(user);

      //i navuguj gdije su zeljeli prije logovanja otici
      //returnUrl se setuje u auth login()
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      //retutn hocem da se dogodi samo tokom inicjalnog
      //logovanja a ne i nakon recimo refreshovanaj
      //browsera
      localStorage.removeItem('returnUrl');

      router.navigateByUrl(returnUrl);
    });
  }
}
