import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookService } from './../book.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

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
        this.book = this.bookService.getBook(+params['id']);
      }
    );
  }

  onCancel(){
    this.router.navigate(['/']);
  }

}
