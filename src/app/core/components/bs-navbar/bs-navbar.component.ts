import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

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
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    //posto imamo single instance of navbar in dom
    //throug life time of our appp, nije potrebno
    //unsubscribovati iz subscriptiona
    this.auth.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });

    //mapirammo ShopingCart koji dobijamo od firebase
    //u nas frontend model representation of ShoppinCart
    //jer nas model ima get totalItemsCount() get metodu
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
