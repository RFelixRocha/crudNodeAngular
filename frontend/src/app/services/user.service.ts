import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  constructor(private http: HttpClient) {

  }

  /**
   * Add user
   * */
   addUser(user: User): Observable<User>{

    const url = `${this.userUrl}`;

    return this.http.post<User>(url,user,this.httpOptions)
    tap((newUser: User) => this.log(`Novo usuário cadastrado, id ${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))

  }

 /** Update user */
  updateUser(user: User): Observable<any> {

   const url = `${this.userUrl}/${user.id}`;

    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.log('Usuário atualizado com sucesso')),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**  Busca todos os usuários */
  getUsers(): Observable<User[]> {

    const url = `${this.userUrl}`;

    return this.http.get<User[]>(url)
      .pipe(
        tap(() => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );

  }

  /**
   * Busca um usuário
   * **/
  searchUser(id: number): Observable<User> {

    const url = `${this.userUrl}/${id}`;

    return this.http.get<User>(url)
      .pipe(
        tap(() => this.log(`fetched user id ${id}`)),
        catchError(this.handleError<User>('searchUser'))
      );

  }

  /**
   * Deleta um usuário
   * **/
  deleteUser(id: number): Observable<User> {

    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url,this.httpOptions)
      .pipe(
        tap(() => this.log(`Usuário com id ${id} deletado`)),
        catchError(this.handleError<User>('deleteUser' ))
      );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log do User.service */
  private log(message: string) {
    console.log(message);
  }

}
