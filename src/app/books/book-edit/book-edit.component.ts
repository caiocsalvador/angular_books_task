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

  id: number;
  bookForm: FormGroup;
  book: Book;
  @ViewChild('anchor') anchor: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      this.anchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    );
  }

  private initForm() {

    this.book = this.bookService.getBook(this.id);

    this.bookForm = new FormGroup({
      'id': new FormControl(this.book.id),
      'title': new FormControl(this.book.title, Validators.required),
      'picture': new FormControl(this.book.picture),
      'author': new FormControl(this.book.author),
      'price': new FormControl(this.book.price, [Validators.required, Validators.pattern(/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/)]),
      'description': new FormControl(this.book.description),
    });

  }

  onSubmit(){
    this.bookService.updateBook(this.bookForm.value.id, this.bookForm.value);
    swal('Successs', 'Book edited!', 'success');
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

}
