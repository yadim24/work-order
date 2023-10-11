import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createRequest } from 'api/createRequest';
import {
  ProductDto,
  ProductItemDto,
  ProductListDto,
  WorkorderItemDto,
  WorkorderListDto,
  WorkorderListQuery,
  productItemDto,
  productListDto,
  workorderItemDto,
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

export const workorderItemQueryKey = {
  root: ['workorderItem'],
  params: (workorderId: string) => [...workorderItemQueryKey.root, workorderId],
};

type UseWorkorderItemQueryOptions = OmitTyped<
  UseQueryOptions<WorkorderItemDto, unknown, WorkorderItemDto, string[]>,
  'queryKey' | 'queryFn'
>;

export const useWorkorderItem = (
  params: { workorderId: string },
  options?: UseWorkorderItemQueryOptions,
): UseQueryResult<WorkorderItemDto> => {
  return useQuery({
    queryKey: workorderItemQueryKey.params(params.workorderId),
    queryFn: async ({ signal }) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/`,
          method: 'GET',
          signal,
        },
        schema: workorderItemDto,
      }),
    ...options,
  });
};

export const productListQueryKey = {
  root: ['productList'],
  params: (workorderId: string) => [...productListQueryKey.root, workorderId],
};

type UseProductListQueryOptions = OmitTyped<
  UseQueryOptions<ProductListDto, unknown, ProductListDto, string[]>,
  'queryKey' | 'queryFn'
>;

export const useProductList = (
  params: { workorderId: string },
  options?: UseProductListQueryOptions,
): UseQueryResult<ProductListDto> => {
  return useQuery({
    queryKey: productListQueryKey.params(params.workorderId),
    queryFn: async ({ signal }) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/products/`,
          method: 'GET',
          signal,
        },
        schema: productListDto,
      }),
    ...options,
  });
};

export const productItemQueryKey = {
  root: ['productItem'],
  params: (workorderId: string, productId: string) => [
    ...productItemQueryKey.root,
    workorderId,
    productId,
  ],
};

type UseProductItemQueryOptions = OmitTyped<
  UseQueryOptions<ProductItemDto, unknown, ProductItemDto, string[]>,
  'queryKey' | 'queryFn'
>;

export const useProductItem = (
  params: { workorderId: string; productId: string },
  options?: UseProductItemQueryOptions,
): UseQueryResult<ProductItemDto> => {
  return useQuery({
    queryKey: productItemQueryKey.params(params.workorderId, params.productId),
    queryFn: async ({ signal }) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/products/${params.productId}/`,
          method: 'GET',
          signal,
        },
        schema: productItemDto,
      }),
    ...options,
  });
};

type UseCreateProductOptions = OmitTyped<
  UseMutationOptions<unknown, unknown, ProductDto>,
  'mutationFn'
>;

export const useCreateProduct = (
  params: { workorderId: string },
  options?: UseCreateProductOptions,
): UseMutationResult<unknown, unknown, ProductDto> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, ProductDto>({
    mutationFn: (data) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/products/`,
          method: 'POST',
          data,
        },
      }),
    ...options,
    onSuccess: (...restParams) => {
      queryClient.invalidateQueries(
        productListQueryKey.params(params.workorderId),
      );
      options?.onSuccess?.(...restParams);
    },
  });
};

type UseDeleteProductOptions = OmitTyped<
  UseMutationOptions<unknown, unknown, { productId: string }>,
  'mutationFn'
>;

export const useDeleteProduct = (
  params: { workorderId: string },
  options?: UseDeleteProductOptions,
): UseMutationResult<unknown, unknown, { productId: string }> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, { productId: string }>({
    mutationFn: ({ productId }) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/products/${productId}/`,
          method: 'DELETE',
        },
      }),
    ...options,
    onSuccess: (...restParams) => {
      queryClient.invalidateQueries(
        productListQueryKey.params(params.workorderId),
      );
      options?.onSuccess?.(...restParams);
    },
  });
};
