import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FirebaseService } from 'src/app/services/firebase.service';
=======
>>>>>>> 34f4984f8f97388676152fab5eaaa018bb14a86a

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

<<<<<<< HEAD
  productos;
  constructor(
    private service:FirebaseService
  ) { 
    this.productos = this.service.productos;
  }
=======
  constructor() { }
>>>>>>> 34f4984f8f97388676152fab5eaaa018bb14a86a

  ngOnInit(): void {
  }

}
