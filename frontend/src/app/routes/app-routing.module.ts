import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from "../components/users/users.component";
import { UserCreateComponent } from "../components/user-create/user-create.component";
import { UserDetailsComponent } from "../components/user-details/user-details.component";
import { UserUpdateComponent } from "../components/user-update/user-update.component";

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: UserCreateComponent },
  { path: 'users/details/:id', component: UserDetailsComponent },
  { path: 'users/update/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
