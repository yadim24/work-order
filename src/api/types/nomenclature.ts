import { z } from 'zod';

export const nomenclatureItemDto = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
});

export type NomenclatureItemDto = z.infer<typeof nomenclatureItemDto>;

export const nomenclatureListDto = z.array(nomenclatureItemDto);

export type NomenclatureListDto = z.infer<typeof nomenclatureListDto>;

export type NomenclatureQuery = {
  id?: number;
  page?: number;
  search?: string;
};
