import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

// App routes
const appRoutes: Routes = [
    { path: '', component: BooksComponent },
    { path: 'book/:id', component: BookDetailComponent },
    { path: 'book/:id/edit', component: BookEditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}