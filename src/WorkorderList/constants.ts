import { WorkorderListQuery } from 'api/types/workorder';

export const QUERY_PARAM = {
  PAGE: 'page',
  START_DATE: 'start_date',
  IS_FINISHED: 'is_finished',
  PRODUCT_ID: 'product_id',
  SEARCH: 'search',
} satisfies Record<string, keyof WorkorderListQuery>;
