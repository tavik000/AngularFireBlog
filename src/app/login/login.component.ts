import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../public/stylesheets/bootstrap.css',
    '../public/stylesheets/style.css',
    '../public/stylesheets/blogStyle.css'
  ],
})
export class LoginComponent implements OnInit {
  @Input() user: any;
  @Input() isAdmin:Boolean = false;

  @Output() userChanged: EventEmitter<any> = new EventEmitter();
  @Output() isAdminChanged: EventEmitter<any> = new EventEmitter();


  constructor(public afAuth: AngularFireAuth) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((credential) =>  {
      this.passUser();
    }).catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.isAdmin = false;
    this.isAdminChanged.emit(this.isAdmin);
  }


  passUser() {
    // console.log('Emit Child User');
    this.user = this.afAuth.auth.currentUser;
    if (this.user.email == 'tavik002@gmail.com' || this.user.email == 'yanicech@gmail.com') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.userChanged.emit(this.user);
    this.isAdminChanged.emit(this.isAdmin);
  }

  ngOnInit() {
    this.logout();
  }

}
