import { Component, Input, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: '[app-pdf-detalle]',
  templateUrl: './pdf-detalle.component.html',
  styleUrls: ['./pdf-detalle.component.css']
})
export class PdfDetalleComponent implements OnInit {

  @Input() invoice;
  constructor(private service:FirebaseService) { }

  ngOnInit(): void {
  }

  renderPDF(){
    const options = {
      filename:'ticket.pdf',
      image:{type:'jpeg'},
      html2canvas:{},
      jsPDF:{ orientation: 'landscape' }
    }
    const view = document.getElementById('html2Canvas');
    html2pdf()
      .from(view)
      .set(options)
      .save();
    }
}

