export class ArticleEditModel {
    constructor(
        public _id: string,
        public title: string,
        public text: string,
        public tags: string[],
        public images: string[]
    ) {}
};