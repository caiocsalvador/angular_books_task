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

  // Book ID for Delete function
  id: number;
  // Books array
  books: Book[];
  // Subscription that checks every time that the books array changes
  subscription: Subscription;
  // Datatable variables
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

    // Get books when the component init
    this.books = this.bookService.getBooks();

    // Datatable options
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 8
    };

    // Subscription that checks every time that the books array changes
    this.subscription = this.bookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
        this.rerender();
      }
    );
  }

  // After the view inits, render the datatable
  ngAfterViewInit(){
    this.dtTrigger.next();
  }

  // When books array changes, rerender the datatable
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  // When the user clicks on the delete button/icon
  onDelete(id: number){
    // Sweet alert confirm, asking if the user is sure to delete
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // If confirmed delete the book
        this.bookService.deleteBook(id);
        // Navigate to the root
        this.router.navigate(['./']);
        // Show success message
        swal(
          'Deleted!',
          'Book deleted.',
          'success'
        );
        // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      } else if (result.dismiss === 'cancel') {
        // Show canceled message
        swal(
          'Cancelled',
          'Your book is safe :)',
          'error'
        );
      }
    });
  }

  // Whether the component is destroyed, unsubscribe for the array changes
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
