<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>YATA</h1>
<p>Yet another todo app</p>

{#if !data.user}
  <button on:click={() => signIn('github')}>Sign in (GitHub)</button>
  <button on:click={() => signIn('google')}>Sign in (Google)</button>
{:else}
  {@const user = data.user}
  <p>Hello, {user.name}!</p>
  <button on:click={() => signOut()}> Sign out </button>
  <hr />
  <h2>Tasks</h2>
  <form method="POST" action="?/createTask">
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" />
    </div>
    <div>
      <label for="description">Description</label>
      <input type="text" id="description" name="description" />
    </div>
    <button>Create</button>
  </form>
  <ul>
    {#each data.tasks as task (task.id)}
      <li>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <form method="POST" action={`?/deleteTask&id=${task.id}`}>
          <button type="submit">Delete</button>
        </form>
      </li>
    {:else}
      <p>You don't have any tasks yet</p>
    {/each}
  </ul>
{/if}
