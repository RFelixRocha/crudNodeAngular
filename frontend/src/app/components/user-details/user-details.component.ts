import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,private alertService: AlertService) { }

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

        this.userService.deleteUser(user.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Usuário excluído com sucesso',
            'success'
          )
          this.router.navigate(['/users']);

        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })

  }

}
