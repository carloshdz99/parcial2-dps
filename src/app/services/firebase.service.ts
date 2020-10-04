import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  productos = [
    {
      codigo:'001',
      nombre:'manzana',
      precio:0.20,
      descripcion:'manzana, fresca',
      imagen:'https://cdn.pixabay.com/photo/2017/09/26/13/31/apple-2788616__340.jpg'
    },
    {
      codigo:'002',
      nombre:'maiz',
      precio:0.30,
      descripcion:'maiz procesado',
      imagen:'https://cdn.pixabay.com/photo/2018/09/26/21/24/sweet-corn-3705687__340.jpg'
    },
    {
      codigo:'003',
      nombre:'carne',
      precio:4.25,
      descripcion:'carne de res',
      imagen:'https://cdn.pixabay.com/photo/2018/02/04/19/42/ham-3130701__340.jpg'
    },
    {
      codigo:'004',
      nombre:'pan',
      precio:0.50,
      descripcion:'pan frances recien horneado',
      imagen:'https://cdn.pixabay.com/photo/2020/05/25/19/24/bread-5220161__340.jpg'
    },
    {
      codigo:'005',
      nombre:'pupusas',
      precio:0.50,
      descripcion:'pupas de frijol con queso',
      imagen:'https://cdn.kiwilimon.com/recetaimagen/2806/th5-640x426-25790.jpg'
    },
  ];

  constructor(
    private db:AngularFirestore
  ) { }

  get(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('tickets')
      .valueChanges()
      .subscribe(response => resolve(response));
    });
  }

  post(model){
    return this.db.collection('tickets').add(model);
  }

  delete(id){
    return this.db.collection('tickets').doc(id).delete();
  }
}
