import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: { status?: boolean; owner?: string; body?: string; category?: string}): Observable<Todo[]> {

    let httpParams: HttpParams = new HttpParams();
    if(filters){
      if (filters.status){
        httpParams = httpParams.set('status',filters.status);
      }
      if (filters.owner){
        httpParams = httpParams.set('owner',filters.owner);
      }
      if (filters.body){
        httpParams = httpParams.set('body',filters.body);
      }
      if (filters.category){
        httpParams = httpParams.set('category',filters.category);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }
  filterTodos(todos: Todo[], filters: { owner?: string; category?: string }): Todo[] {
    let filteredTodos = todos;

    if (filters.category) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }
    return filteredTodos;
  }
}
