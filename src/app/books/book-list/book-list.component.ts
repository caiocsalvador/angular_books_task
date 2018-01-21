import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import swal from 'sweetalert2';


import { Book } from './../book.model';
import { BookService } from './../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy, AfterViewInit  {

  id: number;
  books: Book[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );

    this.books = this.bookService.getBooks();

    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 8
    };

    this.subscription = this.bookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
        this.rerender();
      }
    );
  }

  ngAfterViewInit(){
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onDelete(id: number){
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.bookService.deleteBook(id);
        this.router.navigate(['./']);
        swal(
          'Deleted!',
          'Book deleted.',
          'success'
        );
        // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your book is safe :)',
          'error'
        );
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
