import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  registryForm = this.fb.group({
    correo: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    ]],
    contra: ['', Validators.required]
  })

  constructor(
    public authservice: AuthService,
    public fb: FormBuilder
  ) { }

  get form(){
    return this.registryForm.controls;
  }

  onSubmit(){
    const correo = this.registryForm.value.correo;
    const contra = this.registryForm.value.contra;

    this.authservice.registro(correo, contra);
  }

  ngOnInit(): void {
  }

}
