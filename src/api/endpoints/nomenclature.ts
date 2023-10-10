import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { createRequest } from 'api/createRequest';
import {
  NomenclatureListDto,
  NomenclatureQuery,
  nomenclatureListDto,
} from 'api/types/nomenclature';
import { OmitTyped } from 'shared/types';

export const nomenclatureQueryKey = {
  root: ['nomenclature'],
  query: (query: NomenclatureQuery) => [...nomenclatureQueryKey.root, query],
};

type UseNomenclatureOptions = OmitTyped<
  UseQueryOptions<
    NomenclatureListDto,
    unknown,
    NomenclatureListDto,
    (string | NomenclatureQuery)[]
  >,
  'queryKey' | 'queryFn'
>;

export const useNomenclature = (
  query?: NomenclatureQuery,
  options?: UseNomenclatureOptions,
): UseQueryResult<NomenclatureListDto> => {
  return useQuery({
    queryKey: nomenclatureQueryKey.query(query ?? {}),
    queryFn: async ({ signal }) =>
      createRequest({
        options: {
          url: '/nomenclatures/',
          method: 'GET',
          params: query,
          signal,
        },
        schema: nomenclatureListDto,
      }),
    ...options,
  });
};
