import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDoService } from 'src/services/todo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [
    ToDoService,
    { provide: 'square' , useFactory: () => (n) => n * n },
    { provide: 'email' , useValue: 'asgara75@gmail.com' }

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
