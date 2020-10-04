import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ValidarProductos } from 'src/app/shared/validarProductos';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  productos;
  ticketsForm = this.fb.group({
    nombre:['', Validators.required],
    dui:['', [
      Validators.required,
      Validators.pattern('^[0-9]{9}-[0-9]{1}$')
    ]],
    codigo:['', Validators.required, ValidarProductos.validarCodigo(this.service)],
  });
  detalles = [];
  total=0;

  constructor(
    private service:FirebaseService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) { 
    this.productos = this.service.productos;
  }
  ngOnInit(): void {
  }

  get form(){
    return this.ticketsForm.controls;
  }

  onClick(){
    const codigo = this.ticketsForm.value.codigo;
    const filtro = this.productos.find(x => x.codigo === codigo);
    if(filtro !== null) {
      this.detalles.push({
        codigo:filtro.codigo,
        nombre:filtro.nombre,
        precio:filtro.precio,
        cantidad:1
      });
      this.calcularTotal();
    }
  }

  eliminarProducto(detalle){
    this.detalles.splice(this.detalles.indexOf(detalle), 1);
    this.calcularTotal();
  }

  calcularTotal(){
    this.total = this.detalles.reduce((a, b) => a + b.precio, 0);
  }

  onSubmit(){this.visitas();}

  visitas(){
    this.service.get()
      .then(response => {
        const ticket = this.ticketsForm.value,
              visitas = response.filter(x => x.dui === ticket.dui).length,
              model:any = {
                nombre:ticket.nombre,
                dui:ticket.dui,
              } 
        if(visitas >= 5 ) {
          this.detalles.forEach(x => {x.precio = x.precio - (x.precio * 0.08)})
          model.detalle = this.detalles;
          model.descuento = '8%';
        }
        else if(visitas >= 2 || visitas < 5) {
          this.detalles.forEach(x => {x.precio = x.precio - (x.precio * 0.05)})
          model.detalle = this.detalles;
          model.descuento = '5%';
        }
        else model.descuento = 'sin descuento';
        this.calcularTotal();
        model.pago = this.total;
        this.service.post(model);
        this.toastr.success(`total a pagar: $ ${this.total}`, 'compra registrada');
        this.vaciar();
      });
  }

  vaciar(){
    this.ticketsForm.reset();
    this.detalles = [];
    this.total = 0;
  }

}

=======

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
>>>>>>> 34f4984f8f97388676152fab5eaaa018bb14a86a
