import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';

import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from './shared/components/product-quantity/product-quantity.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ShoppigCartSummaryComponent } from './shopping/components/shoppig-cart-summary/shoppig-cart-summary.component';
import { OrderItemComponent } from './shopping/components/order-item/order-item.component';
import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    AdminProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppigCartSummaryComponent,
    OrderItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NarikCustomValidatorsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
