import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

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

  constructor(private userService: UserService, private alertService: AlertService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.searchUser()
  }

  searchUser(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.userService.searchUser(id)
      .subscribe(user => {
          if (user === undefined){
            this.alertService.info('Antenção!',`Usuário não encontrado`)
            this.router.navigate(['/users']);
          }

          this.user = user

        },
        (httpError) => this.alertService.error('Error!',`${httpError.error.message}`));
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
          this.user.foto = event.target.result;
      }

      //Chama a função que faz upload da imagem
      this.userService.uploadFotoUser(formData).subscribe((uploadImg: any) => {

        this.user.foto = uploadImg.path_foto;
       
      },(httpError) => {
        
        this.alertService.error('Error!',`${httpError.error.message}`);
      })

    }

  }

  saveUserUpdate(): void{

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

    if (this.user) {

      this.userService.updateUser(this.user).subscribe(updateUser => {
        this.alertService.success('Sucesso!',`Usuário ${this.user.name} atualizado com sucesso.`)
        this.router.navigate([`/users/${this.user.id}`]);
      },(httpError) => {
       
        this.alertService.error('Error!',`${httpError.error.message}`);
      })

    }

  }

}
