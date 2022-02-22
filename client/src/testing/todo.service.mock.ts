import { Injectable } from '@angular/core';
import { Todo } from 'src/app/todos/todo';
import { TodoService } from 'src/app/todos/todo.service';
import { Observable, of } from 'rxjs';
/* jshint ignore:start*/
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: '58895985c32328e015584db2',
      owner: 'Workman',
      status: false,
      body: 'Proident cupidity exercitation id ullamco magna +\
      do qui aliquip id. Eiusmod labore non nostrud culpa duds incididunt incididunt esse occaecat amer officia.',
      category: 'homework'
    },
    {
      _id: '58895985f13555dedae2cf6f',
      owner: 'Workman',
      status: false,
      body: 'Excepteur irure et mollit esse laboris ad tempor ullamco. +\
      Eiusmod nostrud qui veniam adipisicing aliqua voluptate reprehenderit ut amet excepteur.',
      category: 'software design'
    },
    {
      _id: '588959856601f6a77b6a2862',
      owner: 'Fry',
      status: false,
      body: 'Sunt esse dolore sunt Lorem velit reprehenderit incididunt +\
      minim Lorem sint Lorem sit voluptate proident. Veniam voluptate veniam aliqua ipsum cupidatat.',
      category: 'homework'
    },
    {
      _id: '58895985847a6c1445ec4048',
      owner: 'Barry',
      status: true,
      body: 'Deserunt velit reprehenderit deserunt sunt excepteur sit eu +\
      eiusmod in voluptate aute minim mollit. Esse aliqua esse officia do proident non consequat non mollit.',
      category: 'video games'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: boolean; owner?: string; body?: string; category: string }): Observable<Todo[]> {

    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {

    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }
/* jshint ignore:end */
}
