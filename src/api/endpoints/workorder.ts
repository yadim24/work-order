import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { createRequest } from 'api/createRequest';
import {
  WorkorderListDto,
  WorkorderListQuery,
  workorderListDto,
} from 'api/types/workorder';
import { OmitTyped } from 'shared/types';

export const workorderListQueryKey = {
  root: ['workorderList'],
  query: (query: WorkorderListQuery) => [...workorderListQueryKey.root, query],
};

type UseWorkorderListQueryOptions = OmitTyped<
  UseQueryOptions<
    WorkorderListDto,
    unknown,
    WorkorderListDto,
    (string | WorkorderListQuery)[]
  >,
  'queryKey' | 'queryFn'
>;

export const useWorkorderList = (
  query: WorkorderListQuery,
  options?: UseWorkorderListQueryOptions,
): UseQueryResult<WorkorderListDto> => {
  return useQuery({
    queryKey: workorderListQueryKey.query(query),
    queryFn: async ({ signal }) =>
      createRequest({
        options: {
          url: '/workorders/',
          method: 'GET',
          params: query,
          signal,
        },
        schema: workorderListDto,
      }),
    ...options,
  });
};
