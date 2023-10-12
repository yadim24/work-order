import { z } from 'zod';

export const workorderItemDto = z.object({
  id: z.number(),
  number: z.string(),
  start_date: z.string().nullable(),
  material: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
  }),
  product: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
  }),
  is_finished: z.boolean(),
});

export type WorkorderItemDto = z.infer<typeof workorderItemDto>;

export const workorderListDto = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(workorderItemDto),
});

export type WorkorderListDto = z.infer<typeof workorderListDto>;

export type WorkorderListQuery = {
  page: number;
  page_size: number;
  start_date?: string;
  is_finished?: boolean;
  product__id?: number;
  search?: string;
  ordering?: string;
};

export const productItemDto = z.object({
  id: z.number(),
  serial: z.string(),
  weight: z.string(),
  date: z.string(),
});

export type ProductItemDto = z.infer<typeof productItemDto>;

export const productListDto = z.array(productItemDto);

export type ProductListDto = z.infer<typeof productListDto>;

export type ProductDto = {
  weight: string;
};

export type CreateUpdateWorkorderDto = {
  number: string;
  start_date: string | null;
  material: string;
  product: string;
  is_finished: boolean;
};
