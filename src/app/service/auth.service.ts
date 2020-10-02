import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public authuser: AngularFireAuth,
    public route: Router,
    public ngzone: NgZone,
    public afs: AngularFirestore,
    public toast: ToastrService
  ) {
    this.authuser.onAuthStateChanged(function (user) {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
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
          this.verificacionCorreo();
          localStorage.setItem('user', null);
        });
        this.toast.success("Cuenta Creada!", "Inicia Sesion");
      }).catch(() => {
        this.toast.error("Error!", "Revisa tu cuenta");
      })
  }

  //correo de verificacion
  verificacionCorreo(){
    return this.authuser.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.route.navigate(["login"]);
    })
  }
  //por correo y contraseña
  sesion(correo: string, constraseña: string) {
    return this.authuser.signInWithEmailAndPassword(correo, constraseña)
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['']);
        });
        this.toast.success("Bienvenido!", "Tienda Diego");
      }).catch(() => {
        this.toast.error("Error!", "Revisa tus credenciales");
      })

  }

  //cerrar sesion
  cerrarsesion() {
    this.authuser.signOut();
    localStorage.setItem('user', null);
    localStorage.removeItem('user');
    this.route.navigate(['login']);
  }

  //sesion con google
  sesionGoogle() {
    return this.autenticacion(new auth.GoogleAuthProvider());
  }

  //auth funcion para proveedores
  autenticacion(provider) {
    return this.authuser.signInWithPopup(provider)
      .then(() => {
        this.ngzone.run(() => {
          this.route.navigate(['']);
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
}
