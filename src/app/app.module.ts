import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { ProductosComponent } from './components/productos/productos.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { FirebaseService } from './services/firebase.service';
import { PdfDetalleComponent } from './components/detalle/childs/pdf-detalle/pdf-detalle.component';

const routes:any = [
  {
    path:'', component:NavbarComponent, children:[
      // componentes hijos
      {path:'productos', component:ProductosComponent},
      {path:'tickets', component:TicketsComponent},
      {path:'detalle', component:DetalleComponent},
    ]
  },
  {path:'login', component:LoginComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductosComponent,
    TicketsComponent,
    DetalleComponent,
    LoginComponent,
    NotFoundComponent,
    PdfDetalleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
