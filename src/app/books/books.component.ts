import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  id: number;
  bookForm: FormGroup;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){

    this.bookForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'picture': new FormControl(''),
      'author': new FormControl(''),
      'price': new FormControl('', [Validators.required, Validators.pattern(/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/)]),
      'description': new FormControl(''),
    });

  }

  onSubmit(){
    this.bookService.addBook(this.bookForm.value);
    swal('Successs', 'Book added!', 'success');
    this.initForm();
  }

}
