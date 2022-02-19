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
  body: this.body,
  owner: this.owner
  }).subscribe(returnedTodos =>{
    this.serverFilteredTodos = returnedTodos;
    this.updateFilter();
  }, err => {
    // If there was an error getting the users, log
    // the problem and display a message.
    console.error('We couldn\'t get the list of todos; the server might be down');
    this.snackBar.open(
      'Problem contacting the server – try again',
      'OK',
      // The message will disappear after 3 seconds.
      { duration: 3000 });
    });
}
  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { category: this.category}
    );
 }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
