import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';
/* eslint max-len: ["error", {"ignoreStrings": true}]*/
describe('TodoService', () => {
  //Small list of todos
  const testTodos: Todo[] = [
    {
      _id: '58895985c32328e015584db2',
      owner: 'Workman',
      status: false,
      body: 'Proident cupidity exercitation id ullamco magna do qui aliquip id. Eiusmod labore non nostrud culpa duds incididunt incididunt esse occaecat amer officia.',
      category: 'homework'
    },
    {
      _id: '58895985f13555dedae2cf6f',
      owner: 'Workman',
      status: false,
      body: 'Excepteur irure et mollit esse laboris ad tempor ullamco. Eiusmod nostrud qui veniam adipisicing aliqua voluptate reprehenderit ut amet excepteur.',
      category: 'software design'
    },
    {
      _id: '588959856601f6a77b6a2862',
      owner: 'Fry',
      status: false,
      body: 'Sunt esse dolore sunt Lorem velit reprehenderit incididunt minim Lorem sint Lorem sit voluptate proident. Veniam voluptate veniam aliqua ipsum cupidatat.',
      category: 'homework'
    },
    {
      _id: '58895985847a6c1445ec4048',
      owner: 'Barry',
      status: true,
      body: 'Deserunt velit reprehenderit deserunt sunt excepteur sit eu eiusmod in voluptate aute minim mollit. Esse aliqua esse officia do proident non consequat non mollit.',
      category: 'video games'
    }
  ];
  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodoService(httpClient);

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  describe('getUsers()', () => {

    it('calls `api/todos` when `getTodos()` is called with no parameters', () => {

      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todoService.todoUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);
      // Specify the content of the response to that request. This
      // triggers the subscribe above, which leads to that check
      // actually being performed.
      req.flush(testTodos);
    });
    describe('Calling getTodos() with parameters correctly forms the HTTP request', () => {
      it('correctly calls api/todos with filter parameter \'owner\'', () => {
        todoService.getTodos({ owner: 'Barry' }).subscribe(
          todo => expect(todo).toBe(testTodos)
        );
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'admin'
        expect(req.request.params.get('owner')).toEqual('Barry');

        req.flush(testTodos);
      });
      it('correctly calls api/users with filter parameter \'complete\'', () => {
        todoService.getTodos({ status: true }).subscribe(
          users => expect(users).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made
        // to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'Status'
        expect(req.request.params.get('status')).toEqual('true');

        req.flush(testTodos);
      });
    });
  });

  describe('filterTodos()', () => {
    it('filters by category', () => {
      const todoCategory = 'homework';
      const filteredTodos = todoService
        .filterTodos(testTodos, { category: todoCategory });
      expect(filteredTodos.length).toBe(2);
      filteredTodos.forEach(todo => {
        expect(todo.category
          .indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });
    it('filters by body', () => {
      const todoBody = 'Proident cupidity';
      const filteredTodos = todoService
        .filterTodos(testTodos, { body: todoBody });
      expect(filteredTodos.length).toBe(1);
      filteredTodos.forEach(todo => {
        expect(todo.body
          .indexOf(todoBody)).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

