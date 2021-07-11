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
    foto_key: '',
    foto_url: '',
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

  carregarFoto(event: any) {

    if (event.target.files && event.target.files[0]) {

      if(event.target.files[0]['type'].toUpperCase() != "image/png".toUpperCase() && event.target.files[0]['type'].toUpperCase() != "image/jpeg".toUpperCase())
      {
        this.alertService.info('Atenção!','Tipo de imagem inválida, selecione o formato PNG ou JPEG.');
        return;
      }

      var formData = new FormData();

      formData.append("foto", event.target.files[0]);

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any) => {
          this.user.foto_url = event.target.result;
      }

      //Chama a função que faz upload da imagem
      this.userService.uploadFotoUser(formData).subscribe((uploadImg: any) => {

        this.user.foto_url = uploadImg.url;

      },(httpError) => {
        console.log(httpError);
        this.alertService.error('Error!',`${httpError.error.message}`);
      })

    }

  }

  addUser(): void{

    this.user.name = this.user.name.trim();
    this.user.email = this.user.email.trim();

    if(this.user.escolaridade == 0){
      this.alertService.info('Atenção!',`Escolha uma opção válida de escolaridade.`)
      return;
    }

    if(!this.user.email){
      this.alertService.info('Atenção!',`O campo e-mail é obrigatório.`)
      return;
    }

    if (this.user.name.length < 5){
      this.alertService.info('Atenção!',`O campo nome não pode ter menos de 5 caracteres.`)
      return
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
      foto_key: '',
      foto_url: '',
      escolaridade: 0
    }
  }

}
