import { WorkorderListQuery } from 'api/types/workorder';

export const QUERY_PARAM = {
  PAGE: 'page',
  PAGE_SIZE: 'page_size',
  START_DATE: 'start_date',
  IS_FINISHED: 'is_finished',
  PRODUCT_ID: 'product__id',
  SEARCH: 'search',
  ORDERING: 'ordering',
} satisfies Record<string, keyof WorkorderListQuery>;
