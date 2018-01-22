import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';

import { Book } from './book.model';

@Injectable()
export class BookService{
    // This Subject will aways report when the books array change
    booksChanged = new Subject<Book[]>();

    // Sample books array
    private books: Book[] = [
        new Book(
            1,
            'Don\'t Make Me Think',
            'https://images.gr-assets.com/books/1384736553l/18197267.jpg',
            'Steve Krug',
            'Steve is such a great writer (and an all around great guy!). He has a way of cutting through all the chatter and clutter and bringing out the essence of a topic.',
            12.99,
        ),
        new Book(
            2,
            'Forms That Work',
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3071438&qld=90&l=430&a=-1',
            'Caroline Jarrett and Gerry Gaffney',
            'If you are designing anything that has a form: a web page, web app, software application, mobile app, or even a paper form, you must read this book.',
            19.99,
        ),
        new Book(
            3,
            'Designing Web Usability',
            'https://media.nngroup.com/media/publications/books/designing.gif.300x400_q95_autocrop_crop_upscale.jpg',
            'Jakob Nielsen',
            'New approaches for crafting effective sites.This book is a tutorial and exposition of the principles of web site design.',
            19.99,
        )
    ];

    // Set Books
    setBooks(books: Book[]){
        this.books = books;
        this.booksChanged.next(this.books.slice().reverse());
    }

    // Get all books
    getBooks(){
        return this.books.slice().reverse();
    }

    // Get a single book by id
    getBook(id: number){
        let book: Book;
        book = this.books.find(x => x.id === id);
        return book;
    }

    // Add a book
    addBook(book: Book){
        // Check the last book added to create a new ID for the new one.
        const lastAddedBook = this.books[this.books.length - 1];
        book.id = lastAddedBook.id + 1;
        // Push the new book into the array
        this.books.push(book);
        this.booksChanged.next(this.books.slice().reverse());
    }

    // Update a book
    updateBook(id: number, newBook: Book){
        // Get the index of the book in array by the book id
        const index = this.books.findIndex(x => x.id === id);
        // Insert the new values
        this.books[index] = newBook;
        this.booksChanged.next(this.books.slice().reverse());
    }

    // Delete a book
    deleteBook(id: number) {
        // Get the index of the book in array by the book id
        const index = this.books.findIndex(x => x.id === id);
        // Remove from the array
        this.books.splice(index, 1);
        this.booksChanged.next(this.books.slice().reverse());
    }
}