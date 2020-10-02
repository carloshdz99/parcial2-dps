import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User;
  constructor(
    public authuser: AngularFireAuth,
    public route: Router,
    public ngzone: NgZone,
    public afs: AngularFirestore
  ) { }

  //metodo de autenticacion
  registro(correo: string, constraseña: string) {
    return this.authuser.createUserWithEmailAndPassword(correo, constraseña)
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['navbar']);
        });
      }).catch((error) => {
        window.alert(error.message);
      })
  }
  //por correo y contraseña
  sesion(correo: string, constraseña: string) {
    return this.authuser.signInWithEmailAndPassword(correo, constraseña)
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['navbar']);
        });
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  //cerrar sesion
  cerrarsesion() {
    localStorage.setItem('user', null);
    localStorage.removeItem('user');
    this.authuser.signOut()
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['login']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //sesion con google
  sesionGoogle() {
    return this.autenticacion(new auth.GoogleAuthProvider());
  }

  //auth funcion
  autenticacion(provider) {
    return this.authuser.signInWithPopup(provider)
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['navbar']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : true;
  }
}
