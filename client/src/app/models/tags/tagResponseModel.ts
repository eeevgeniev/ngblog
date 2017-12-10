import { Tag } from './tag';

export class TagResponseModel {
    public success: string;
    public message: string;
    public tags: Tag[];
}