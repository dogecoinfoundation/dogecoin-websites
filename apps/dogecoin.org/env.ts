import { keys as email } from '@repo/email/keys';
import { keys as core } from '@repo/next-config/keys';
import { keys as observability } from '@repo/observability/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [
    core(),
    email(),
    observability(),
  ],
  server: {
    STATIC_EXPORT: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SOFTLAUNCH: z.string().optional(),
  },
  runtimeEnv: {
    STATIC_EXPORT: process.env.STATIC_EXPORT,
    NEXT_PUBLIC_SOFTLAUNCH: process.env.NEXT_PUBLIC_SOFTLAUNCH,
  },
});
