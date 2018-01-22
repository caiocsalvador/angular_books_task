import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { BookService } from './book.service';

// This component has the add book function
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  // Add book form
  bookForm: FormGroup;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    // Configure the form
    this.initForm();
  }

  // Configure the form
  private initForm(){
    // Set the form inputs
    this.bookForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'picture': new FormControl(''),
      'author': new FormControl(''),
      'price': new FormControl('', [Validators.required, Validators.pattern(/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/)]),
      'description': new FormControl(''),
    });

  }

  // When the form is submited
  onSubmit(){
    // Add a new book
    this.bookService.addBook(this.bookForm.value);
    // Success message
    swal('Successs', 'Book added!', 'success');
    // Reset form
    this.initForm();
  }

}
