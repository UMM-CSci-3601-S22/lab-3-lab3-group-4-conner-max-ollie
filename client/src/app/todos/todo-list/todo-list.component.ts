import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public _id: string;
  public status: boolean;
  public owner: string;
  public body: string;
  public category: string;

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
  }

getTodosFromServer() {
  this.todoService.getTodos({
  status: this.status,
  body: this.body
  }).subscribe(returnedTodos =>{
    this.serverFilteredTodos = returnedTodos;
    this.updateFilter();
  });
}
  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { category: this.category, owner: this.owner}
    );
 }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
