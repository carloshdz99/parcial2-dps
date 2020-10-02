import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.authuser.user;
  constructor( public authSvc: AuthService ) { }

  


  ngOnInit(): void {
  }

}
