import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDetalleComponent } from './pdf-detalle.component';

describe('PdfDetalleComponent', () => {
  let component: PdfDetalleComponent;
  let fixture: ComponentFixture<PdfDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
