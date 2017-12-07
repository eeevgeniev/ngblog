export class ArticleEditModel {
    constructor(
        public _id: number,
        public title: string,
        public text: string,
        public tags: string[]
    ) {}
};