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
  CreateProductDto,
  CreateUpdateWorkorderDto,
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
import { toast } from 'react-toastify';
import { ErrorDto, OmitTyped } from 'shared/types';

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

export type ErrorProductDto = ErrorDto<CreateProductDto>;

type UseCreateProductOptions = OmitTyped<
  UseMutationOptions<unknown, ErrorProductDto, CreateProductDto>,
  'mutationFn'
>;

export const useCreateProduct = (
  params: { workorderId: string },
  options?: UseCreateProductOptions,
): UseMutationResult<unknown, ErrorProductDto, CreateProductDto> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ErrorProductDto, CreateProductDto>({
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
      toast.success('Продукция создана успешно');

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
      toast.success('Продукция удалена успешно');

      options?.onSuccess?.(...restParams);
    },
  });
};

export type ErrorWorkorderDto = ErrorDto<CreateUpdateWorkorderDto>;

type UseCreateWorkorderOptions = OmitTyped<
  UseMutationOptions<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto>,
  'mutationFn'
>;

export const useCreateWorkorder = (
  options?: UseCreateWorkorderOptions,
): UseMutationResult<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto>({
    mutationFn: (data) =>
      createRequest({
        options: {
          url: `/workorders/`,
          method: 'POST',
          data,
        },
      }),
    ...options,
    onSuccess: (...restParams) => {
      queryClient.invalidateQueries(workorderListQueryKey.root);
      toast.success('Заказ-наряд создан успешно');

      options?.onSuccess?.(...restParams);
    },
  });
};

type UseUpdateWorkorderOptions = OmitTyped<
  UseMutationOptions<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto>,
  'mutationFn'
>;

export const useUpdateWorkorder = (
  params: { workorderId: string },
  options?: UseUpdateWorkorderOptions,
): UseMutationResult<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ErrorWorkorderDto, CreateUpdateWorkorderDto>({
    mutationFn: (data) =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/`,
          method: 'PUT',
          data,
        },
      }),
    ...options,
    onSuccess: (...restParams) => {
      queryClient.invalidateQueries(workorderListQueryKey.root);
      queryClient.invalidateQueries(
        workorderItemQueryKey.params(params.workorderId),
      );
      toast.success('Заказ-наряд отредактирован успешно');

      options?.onSuccess?.(...restParams);
    },
  });
};

type UseDeleteWorkorderOptions = OmitTyped<
  UseMutationOptions<unknown, unknown, void>,
  'mutationFn'
>;

export const useDeleteWorkorder = (
  params: { workorderId: string },
  options?: UseDeleteWorkorderOptions,
): UseMutationResult<unknown, unknown, void> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, void>({
    mutationFn: () =>
      createRequest({
        options: {
          url: `/workorders/${params.workorderId}/`,
          method: 'DELETE',
        },
      }),
    ...options,
    onSuccess: (...restParams) => {
      queryClient.invalidateQueries(workorderListQueryKey.root);
      toast.success('Заказ-наряд удален успешно');

      options?.onSuccess?.(...restParams);
    },
  });
};
