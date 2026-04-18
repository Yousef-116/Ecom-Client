import { IProduct } from './product.model';

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: IProduct[];
}
