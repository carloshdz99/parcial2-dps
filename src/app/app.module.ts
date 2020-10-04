import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { environment } from 'src/environments/environment';

//importando componente para autenticacion
import { RegistryComponent } from './components/registry/registry.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ProductosComponent } from './components/productos/productos.component';

//importando alertas toastr
import { ToastrModule } from 'ngx-toastr'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NotFoundComponent,
    RegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path:'', component:NavbarComponent, canActivate: [AuthGuard], children:[
          // componentes de compras, clientes, etc
        ]
      },
      {path:'login', component:LoginComponent},
      {path:'registry' , component:RegistryComponent},
      {path:'productos', component:ProductosComponent},
      {path:"navbar", component: NavbarComponent, canActivate: [AuthGuard]},  
      {path:'**', component:NotFoundComponent},
      
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
