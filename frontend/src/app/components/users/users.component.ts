import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[] = []
  lista_escolaridades = [
    'Pós-graduado',
    'Graduado',
    'Nível Médio',
    'Nível Técnico'
  ]

  constructor( private userService: UserService, private alertService: AlertService) { }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(users => this.users = users)
  }


  delete(user: User): void {
    Swal.fire({
      title: 'Atenção!',
      text: "Você ira excluir o usuário selecionado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!',
      cancelButtonText: 'Não, Cancelar!'
    }).then((result:any) => {

      if (result.isConfirmed) {

        this.users = this.users.filter(filter => filter !== user)

        this.userService.deleteUser(user.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Usuário excluído com sucesso',
            'success'
          )

        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })

  }

}
