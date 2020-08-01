import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerbListComponent } from './verbs/verb-list/verb-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CoverComponent } from './shared/cover/cover.component';
import { VerbFilterComponent } from './verbs/verb-filter/verb-filter.component';
import { VerbComponent } from './verbs/verb/verb.component';


@NgModule({
  declarations: [
    AppComponent,
    VerbListComponent,
    FooterComponent,
    HeaderComponent,
    CoverComponent,
    VerbFilterComponent,
    VerbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'home', component: VerbComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
