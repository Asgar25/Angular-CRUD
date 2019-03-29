import { AppErrorHandler } from './../models/app.errorhandler';
import { ToDoService } from './../services/todo.service';
import { CalculatorService } from './../services/calculator.service';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Todo } from 'src/models/todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalculatorService] // for Registerinng the services
})
export class AppComponent implements OnInit {

  todos: Todo[];

  // Inject the services (Angular Dependency)
  constructor(public calcObj: CalculatorService,
    public todoService: ToDoService,
     @Inject ('square') public sqrFn: Function,
     @Inject ('email') public emailAddress: string) {

    console.log(this.calcObj.add(5, 5));
    console.log(this.sqrFn(4));
    console.log(this.emailAddress);
    this.todos = [];

  }
  ngOnInit(): void {

    this.todoService.getAllTodos().subscribe((todoList: Todo[]) => {
      this.todos = todoList;
    }, (err: AppErrorHandler) => {
      console.log(err.message);
    });
  }

  getTodoById(id: number): void {
    this.todoService.getTodoById(id).subscribe((todo: Todo) => {
      alert(`Id:${todo.Id} Title:${todo.Title}`);
    }, (err: AppErrorHandler) => {
      console.log(err.message);
    });
  }

  addTodo(): void {
    const todoObj = { Id: 155, Title: 'Testing', UserId: 110, Completed: false};
    this.todoService.addTodo(todoObj).subscribe((todo: Todo) => {
     this.todos.push(todo);
      alert(`Record Added`);
    }, (err: AppErrorHandler) => {
      console.log(err.message);
    });
  }

  updateTodo(todo: Todo): void {
    todo.Title += '-Updated';
    this.todoService.updateTodo(todo).subscribe((todoUpdate: Todo) => {
     todo = todoUpdate;
      alert(`Record Updated`);
    }, (err: AppErrorHandler) => {
      console.log(err.message);
    });
  }


  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.Id).subscribe(() => {
    // finding the index position of todo object that we have deleted
      const indexPos = this.todos.findIndex((todoObj) => {
        return todoObj.Id === todo.Id;
      });
    // remove the todo from todo array
      this.todos.splice(indexPos, 1);
    }, (err: AppErrorHandler) => {
      console.log(err.message);
    });
  }
}
