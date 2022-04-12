import { NgModule } from '@angular/core';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppigCartSummaryComponent } from './components/shoppig-cart-summary/shoppig-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../admin/services/auth-guard.service';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my/orders/:id',
    component: OrderItemComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    ShoppigCartSummaryComponent,
    OrderItemComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ShoppingModule {}
