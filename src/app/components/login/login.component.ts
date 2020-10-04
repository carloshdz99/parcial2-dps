import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    correo: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    ]],
    contra: ['', Validators.required]
  })

  constructor(
    public authservice: AuthService,
    public toastr: ToastrService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get form(){
    return this.loginForm.controls;
  }

  onSubmit(){
    const correo = this.loginForm.value.correo;
    const contra = this.loginForm.value.contra;

    this.authservice.sesion(correo, contra);
  }

}
