import { z } from 'zod';

export const workorderListSearchParamsScheme = z.object({
  page: z
    .string()
    .regex(/\d+/)
    .optional()
    .transform((value) => (value ? Number(value) : 1)),
  start_date: z
    .string()
    .regex(/\d{4}-\d\d-\d\d/)
    .optional(),
  is_finished: z
    .union([z.literal('true'), z.literal('false')])
    .optional()
    .transform((value) => value && value === 'true'),
  product_id: z
    .string()
    .regex(/\d+/)
    .optional()
    .transform((value) => (value ? Number(value) : undefined)),
  search: z.string().optional(),
});
