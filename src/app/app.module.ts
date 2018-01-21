import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { BookService } from './books/book.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    BookEditComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [
    BookService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
