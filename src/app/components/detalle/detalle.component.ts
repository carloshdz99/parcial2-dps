import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  tickets;
  p: number = 1;
  constructor(
    private service:FirebaseService
  ) {
    this.service.get()
      .then(response => {this.tickets = response});
   }

  ngOnInit(): void {
  }
  
  busqueda(e){
   this.service.get() 
    .then(response => {
      const value = e.target.value,
            filter = response.filter(x => x.nombre === value || x.dui === value);
      if(filter.length !== 0) this.tickets = filter;
      else this.tickets = response;
    });
  }
}
