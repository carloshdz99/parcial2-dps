import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public authuser: AngularFireAuth,
    public route: Router,
    public ngzone: NgZone,
    public afs: AngularFirestore
  ) { 
    this.authuser.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


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
    this.route.navigate(['login']);
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
    return (user !== null) ? true : false;
  }

  //verificando correo
  correoVerificacion(){
    return this.authuser.currentUser.then(u => u.sendEmailVerification())
    .then(() => {

    })
  }
}
