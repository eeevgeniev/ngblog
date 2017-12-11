import { Tag } from './tag';

export class TagResponseModel {
    public success: boolean;
    public message: string;
    public tags: Tag[];
}