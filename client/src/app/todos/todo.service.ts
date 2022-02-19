import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: { status?: boolean; owner?: string; body?: string}): Observable<Todo[]> {

    let httpParams: HttpParams = new HttpParams();
    if(filters){
      if (filters.status != null){
        httpParams = httpParams.set('status',filters.status);
      }
      if (filters.owner){
        httpParams = httpParams.set('owner',filters.owner);
      }
      if (filters.body){
        httpParams = httpParams.set('body',filters.body);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }
  filterTodos(todos: Todo[], filters: {category?: string }): Todo[] {
    let filteredTodos = todos;

    if (filters.category) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }
    return filteredTodos;
  }
  getUserById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }
}
