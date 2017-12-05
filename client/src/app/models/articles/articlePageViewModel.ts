import { ArticleInfoViewModel } from './articleInfoViewModel';

export class ArticlePageViewModel {
    public success: boolean;
    public message: string;
    public pages: number;
    public page: number;
    public articles: ArticleInfoViewModel[];
};