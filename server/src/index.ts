import { Elysia } from 'elysia';
import { auth } from './auth.ts';
import { env } from './env.ts';

const app = new Elysia()
  .get('/', () => ({ ok: true, name: 'pip-server', version: '0.1.0' }))
  // Mount better-auth's full handler at /api/auth/*.
  // It serves sign-up, sign-in, sign-out, callbacks, etc.
  .all('/api/auth/*', ({ request }) => auth.handler(request))
  // Returns the authenticated user (or 401). Useful smoke test for the mobile client.
  .get('/me', async ({ request, set }) => {
    const result = await auth.api.getSession({ headers: request.headers });
    if (!result?.user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }
    return { user: result.user, session: result.session };
  })
  .listen(env.PORT);

console.log(`pip-server listening on http://localhost:${env.PORT}`);
console.log(`auth endpoints mounted at  http://localhost:${env.PORT}/api/auth/*`);

export type App = typeof app;
