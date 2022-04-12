import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [
    CommonModule,
    FormsModule,
    NarikCustomValidatorsModule,
    DataTablesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    NarikCustomValidatorsModule,
    DataTablesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
})
export class SharedModule {}
