import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { createRequest } from 'api/createRequest';
import { LoginDto, TokenDto, tokenDto } from 'api/types/login';
import { tokenStore } from 'shared/token';

type ErrorDto = { response?: { data?: { non_field_errors?: string[] } } };

type UseLoginOptions = UseMutationOptions<TokenDto, ErrorDto, LoginDto>;

export const useLogin = (
  options?: UseLoginOptions,
): UseMutationResult<TokenDto, ErrorDto, LoginDto, unknown> =>
  useMutation<TokenDto, ErrorDto, LoginDto>({
    mutationFn: (data) =>
      createRequest({
        options: {
          url: '/api-token-auth/',
          method: 'POST',
          data,
        },
        schema: tokenDto,
      }),
    ...options,
    onSuccess: (data, ...restParams) => {
      tokenStore.setToken(data.token);
      options?.onSuccess?.(data, ...restParams);
    },
  });
