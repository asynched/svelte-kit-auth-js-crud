import { db } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth()

  const tasks = await db.task.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  })

  return {
    user: session?.user,
    tasks: tasks,
  }
}

export const actions: Actions = {
  async deleteTask({ url, locals }) {
    const session = await locals.auth()

    if (!session?.user) {
      return fail(401, {
        message: 'Unauthorized',
      })
    }

    const id = url.searchParams.get('id')

    if (!id) {
      return fail(400, {
        message: 'Missing id',
      })
    }

    await db.task.delete({
      where: {
        id: parseInt(id),
        user: {
          email: session.user.email!,
        },
      },
    })

    return { status: 200 }
  },
  async createTask({ request, locals }) {
    const session = await locals.auth()

    if (!session?.user) {
      return fail(401, {
        message: 'Unauthorized',
      })
    }

    const form = await request.formData()

    await db.task.create({
      data: {
        title: form.get('title') as string,
        description: form.get('description') as string,
        user: {
          connect: {
            email: session.user.email!,
          },
        },
      },
    })

    return { status: 200 }
  },
}
