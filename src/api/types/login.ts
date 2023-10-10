import { z } from 'zod';

export type LoginDto = {
  username: string;
  password: string;
};

export const tokenDto = z.object({
  token: z.string(),
});

export type TokenDto = z.infer<typeof tokenDto>;
