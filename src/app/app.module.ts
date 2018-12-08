import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from './ad-listing/ad-listing.component';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { MarkdownModule } from 'angular2-markdown';
import {EditorMdDirective} from './editor/editor-md.directive';
import { NgxMdModule } from 'ngx-md';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    // MarkdownModule.forRoot(),
    NgxMdModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'blog'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  declarations: [ AppComponent, LoginComponent, CommentComponent, EditorMdDirective ],
  bootstrap: [ AppComponent ],
})


export class AppModule {}

// This one will lead bug for firebase deploy.
// platformBrowserDynamic().bootstrapModule(AppModule);