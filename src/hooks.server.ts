import { SvelteKitAuth } from '@auth/sveltekit'
import Github from '@auth/sveltekit/providers/github'
import Google from '@auth/sveltekit/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_JS_SECRET,
} from '$env/static/private'
import { db } from '$lib/server/prisma'

export const handle = SvelteKitAuth({
  secret: AUTH_JS_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
})
