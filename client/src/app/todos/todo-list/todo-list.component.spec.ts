import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let todo: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    todo = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(todo).toBeTruthy();
  });
});
