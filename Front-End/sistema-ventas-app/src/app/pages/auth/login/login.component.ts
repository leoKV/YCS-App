import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    contrasenia: ['',[Validators.required,Validators.minLength(8)]]
  });
  constructor(private fb: FormBuilder, public baseForm: BaseForm, private authSvc:AuthService){ }

  ngOnInit(): void {}

  onLogin(){
    //Validar que el formulario es correcto
    if(this.loginForm.invalid) return;
    //Obtener información del formulario y se almacenará en la variable 'form'
    const form=this.loginForm.value;
    this.authSvc.login(form).subscribe( (data:AuthResponse | void)=>{ 
     
    });
    console.log("OnLogin Method", form);
  }
}
