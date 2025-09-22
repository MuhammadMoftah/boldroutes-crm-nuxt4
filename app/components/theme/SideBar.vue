<template>
  <section>
    <div
      class="dark:bg-dark-secondary flex flex-col space-y-2 rounded-2xl border-1 border-slate-100 py-5 text-sm shadow-sm dark:border-slate-700"
    >
      <!-- Task Management -->
      <NuxtLink
        to="/task-management"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'task-management' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'task-management' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping items-center justify-between rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <!-- Changed from text-sky-500 to text-slate-600 -->
          <TaskListIcon class="icon mr-4 h-5 w-5 text-slate-600" />
          <span class="text-sm font-semibold">Task Management</span>
        </span>
      </NuxtLink>

      <!-- Developers -->
      <NuxtLink
        to="/developers"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'developers' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center group-hover:flex"
          :class="$route.name === 'developers' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-theme-orange icon mr-4 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm font-semibold">Developers</span>
        </span>
      </NuxtLink>

      <!-- Projects -->
      <NuxtLink
        to="/projects"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'projects' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'projects' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <svg
            class="text-theme-teal icon mr-4 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span class="text-sm font-semibold">Projects</span>
        </span>
      </NuxtLink>

      <!-- My Team -->
      <NuxtLink
        to="/my-team"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'my-team' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'my-team' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <ClipboardDocumentCheckIcon class="text-theme-green icon mr-4 h-6 w-6" />
          <span class="text-sm font-semibold">My Team</span>
        </span>
      </NuxtLink>

      <!-- Set Watcher -->
      <NuxtLink
        to="/set-watcher"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'set-watcher' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'set-watcher' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <EyeIcon class="text-slate-600 icon mr-4 h-6 w-6" />
          <span class="text-sm font-semibold">Set Watcher</span>
        </span>
      </NuxtLink>

      <!-- Leave Requests -->
      <NuxtLink
        to="/leave-requests"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'leave-requests' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'leave-requests' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <!-- Replaced HumanRequestIcon with UserMinusIcon -->
          <UserMinusIcon class="icon mr-4 h-6 w-6 text-slate-600" />
          <span class="text-sm font-semibold">Leave Request</span>
        </span>
      </NuxtLink>

      <!-- Fast Travel -->
      <NuxtLink
        to="/fast-travel"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'fast-travel' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'fast-travel' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-theme-yellow icon mr-4 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span class="text-sm font-semibold">Fast Travel</span>
        </span>
      </NuxtLink>

      <!-- Settings -->
      <NuxtLink
        to="/settings"
        class="group theme-shadow flex h-14 items-center rounded-md bg-white p-4 text-slate-500 capitalize duration-200 hover:pl-6 dark:bg-transparent dark:text-slate-300 dark:shadow-none dark:hover:text-slate-100/90"
        :class="$route.name === 'settings' && 'pl-6'"
      >
        <span
          class="relative mr-3 h-2 w-2 items-center justify-center duration-200 group-hover:flex"
          :class="$route.name === 'settings' ? 'flex' : 'hidden'"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
          />
          <span class="relative inline-flex h-1 w-1 rounded-full bg-sky-500" />
        </span>

        <span class="flex items-end">
          <Cog6ToothIcon class="text-theme-purple icon mr-4 h-6 w-6" />
          <span class="text-sm font-semibold">Settings</span>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { 
  ClipboardDocumentListIcon as TaskListIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  Cog6ToothIcon,
  UserMinusIcon
} from "@heroicons/vue/24/outline"

defineProps<{ collapseStatus: boolean }>()
</script>
