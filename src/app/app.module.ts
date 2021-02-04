import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodFormComponent } from './goods-list/good-form/good-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsListComponent,
    GoodFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
