import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './my-tasks/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyTasksComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
