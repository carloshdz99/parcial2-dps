import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos;
  constructor(
    private service:FirebaseService
  ) { 
    this.productos = this.service.productos;
  }

  ngOnInit(): void {
  }

}
