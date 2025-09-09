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
  server: {},
  client: {
    NEXT_PUBLIC_SOFTLAUNCH: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SOFTLAUNCH: process.env.NEXT_PUBLIC_SOFTLAUNCH,
  },
});
