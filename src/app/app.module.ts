import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ProductComponent} from './component/product/product.component';
import {ProductService} from './services/product.service';
import {ProductListComponent} from './component/product-list/product-list.component';
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {SideBarComponent} from './component/side-bar/side-bar.component';
import {RouterModule, Routes} from '@angular/router';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchComponent} from './component/search/search.component';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    NavBarComponent,
    SideBarComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
