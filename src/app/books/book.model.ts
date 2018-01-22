// Book Model
export class Book {
    constructor(
        public id: number,
        public title: string,
        public picture: string,
        public author: string,
        public description: string,
        public price: number,
    ) { }
}