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
  start_date?: string;
  is_finished?: boolean;
  product_id?: number;
  search?: string;
};
