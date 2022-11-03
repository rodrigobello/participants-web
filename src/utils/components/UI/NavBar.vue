<template>
  <nav class="bg-white shadow">
    <div class="mx-auto w-full">
      <div class="relative flex h-12 items-center justify-end px-16">
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </nav>
</template>
