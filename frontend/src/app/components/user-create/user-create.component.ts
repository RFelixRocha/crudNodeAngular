import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    idade: 0,
    email: '',
    foto: '',
    escolaridade: 0
  }

  lista_escolaridades = [
    'Selecione ..',
    'Pós-graduado',
    'Graduado',
    'Nível Médio',
    'Nível Técnico'
  ]

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(): void{

    let expressaoLetras = /[^a-zA-Z]/g;

    this.user.name = this.user.name.trim();
    this.user.email = this.user.email.trim();

    console.log(this.user);
    console.log(this.user.name.length);

    if (this.user.name.length < 5){
      this.alertService.info('Atenção!',`O campo nome não pode ter menos de 5 caracteres.`)
      return
    }

    if(this.user.name.match(expressaoLetras)){
      this.alertService.info('Atenção!',`O campo nome só aceita letras.`)
      return;
    }

    this.userService.addUser(this.user).subscribe(newUser => {
      this.alertService.success('Sucesso!',`Usuário ${newUser.name} cadastrado com sucesso.`)
      this.clearForm()
      this.router.navigate(['/users']);
    },(httpError) => {
      console.log(httpError);
      this.alertService.error('Error!',`${httpError.error.message}`);
    })

  }

  clearForm(): void{
    this.user = {
      id: 0,
      name: '',
      idade: 0,
      email: '',
      foto: '',
      escolaridade: 0
    }
  }

}
