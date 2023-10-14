export type OmitTyped<T, P extends keyof T> = Omit<T, P>;

export type ErrorDto<T extends Record<string, unknown>> = {
  response?: {
    data?: Partial<Record<keyof T, string[]>>;
  };
};
