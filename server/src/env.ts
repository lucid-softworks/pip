function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const env = {
  PORT: Number(process.env.PORT ?? 39443),
  DATABASE_URL: need('DATABASE_URL'),
  BETTER_AUTH_SECRET: need('BETTER_AUTH_SECRET'),
  BETTER_AUTH_URL: need('BETTER_AUTH_URL'),
  TRUSTED_ORIGINS: (process.env.TRUSTED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};
