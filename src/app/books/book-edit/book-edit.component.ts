import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { BookService } from './../book.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  // Book id
  id: number;
  // Book form
  bookForm: FormGroup;
  // Book object
  book: Book;
  // Item to scrool
  @ViewChild('anchor') anchor: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      // If mobile scrools to the content
      if (window.innerWidth < 768) {
        this.anchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  ngOnInit() {
    // Listen for route changes
    this.route.params.subscribe(
      (params: Params) => {
        // Gets book ID
        this.id = +params['id'];
        // Configure the form
        this.initForm();
      }
    );
  }

  // Configure the form
  private initForm() {
    // Get the book data
    this.book = this.bookService.getBook(this.id);
    // Set the form inputs
    this.bookForm = new FormGroup({
      'id': new FormControl(this.book.id),
      'title': new FormControl(this.book.title, Validators.required),
      'picture': new FormControl(this.book.picture),
      'author': new FormControl(this.book.author),
      'price': new FormControl(this.book.price, [Validators.required, Validators.pattern(/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/)]),
      'description': new FormControl(this.book.description),
    });

  }

  // When the form is submited
  onSubmit(){
    // Update a book
    this.bookService.updateBook(this.bookForm.value.id, this.bookForm.value);
    // Success message
    swal('Successs', 'Book edited!', 'success');
    // Redirect
    this.onCancel();
  }

  // Redirect to root page
  onCancel(){
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

}
