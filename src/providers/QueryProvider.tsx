import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, ReactNode } from 'react';
import { toast } from 'react-toastify';

type Props = {
  children: ReactNode;
};

const globalHandleError = (error: unknown): void => {
  if (isAxiosError(error) && error.response?.status === 500) {
    toast.error('Ошибка сервера', { autoClose: false });
  }

  if (
    isAxiosError(error) &&
    error.response?.status &&
    ![400, 500].includes(error.response.status)
  ) {
    toast.error(`Произошла ошибка, статус: ${error.response.status}`, {
      autoClose: false,
    });
  }

  if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
    toast.error('Ошибка сети, проверьте интернет-сооединение', {
      autoClose: false,
    });
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: globalHandleError,
  }),
  mutationCache: new MutationCache({
    onError: globalHandleError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000, // 5 минут
    },
  },
});

export const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
