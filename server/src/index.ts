import { Elysia } from 'elysia';
import { auth } from './auth.ts';
import { env } from './env.ts';
import { stateRoutes } from './routes/state.ts';

const app = new Elysia()
  .get('/', () => ({ ok: true, name: 'pip-server', version: '0.1.0' }))
  // Mount better-auth's full handler at /api/auth/*.
  // It serves sign-up, sign-in, sign-out, callbacks, etc.
  .all('/api/auth/*', ({ request }) => auth.handler(request))
  // Legacy alias for the bare /me ping. Prefer /api/me/.
  .get('/me', async ({ request, set }) => {
    const result = await auth.api.getSession({ headers: request.headers });
    if (!result?.user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }
    return { user: result.user, session: result.session };
  })
  .use(stateRoutes)
  .listen(env.PORT);

console.log(`pip-server listening on http://localhost:${env.PORT}`);
console.log(`auth endpoints mounted at  http://localhost:${env.PORT}/api/auth/*`);

export type App = typeof app;
