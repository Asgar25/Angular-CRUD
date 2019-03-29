import { AppErrorHandler } from './../models/app.errorhandler';
import { URLS } from './../app/constants/url.constants';
import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ToDoService {

    constructor(public httpClient: HttpClient) {

    }

    // Get method is used to Fetch all the record
    getAllTodos(): Observable<Todo[] | AppErrorHandler> {
        return this.httpClient.get<Todo[]>(URLS.getAllTodoURL)
            .pipe(catchError(err => this.httpErrorHandler(err)));
    }

    // Get by id method is used to Fetch the record by specific ID
    getTodoById(Id: number): Observable<Todo | AppErrorHandler> {
        return this.httpClient.get<Todo>(`${URLS.getAllTodoURL}/${Id}`)
            .pipe(catchError(err => this.httpErrorHandler(err)));
    }

    // POST method is used to Add the record
    addTodo(todo: Todo): Observable<Todo | AppErrorHandler> {
        return this.httpClient.post<Todo>(URLS.getAllTodoURL, JSON.stringify(todo), {
            headers: new HttpHeaders({ 'Content-type': 'application/json' })
        }).pipe(catchError(err => this.httpErrorHandler(err)));
    }

    // PUT method is used to update the record
    updateTodo(todo: Todo): Observable<Todo | AppErrorHandler> {
        return this.httpClient.put<Todo>(`${URLS.getAllTodoURL}/${todo.Id}`, JSON.stringify(todo), {
            headers: new HttpHeaders({ 'Content-type': 'application/json' })
        }).pipe(catchError(err => this.httpErrorHandler(err)));
    }

   // DELETE method is used to delete the record
    deleteTodo(Id: number): Observable<Object | AppErrorHandler> {
        return this.httpClient.delete(`${URLS.getAllTodoURL}/${Id}`)
            .pipe(catchError(err => this.httpErrorHandler(err)));
    }

    // This method is used to Handle the Error if the Error is occured then this method will handle
    httpErrorHandler(err: HttpErrorResponse): Observable<AppErrorHandler> {
        // tslint:disable-next-line:prefer-const
        let appError: AppErrorHandler;
        appError.status = err.status;
        appError.statusText = err.statusText;
        appError.url = err.url;
        appError.message = `${err.url} $(err.statusText}`;
        return throwError(appError);

    }
}
