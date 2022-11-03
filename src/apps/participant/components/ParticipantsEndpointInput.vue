<script setup lang="ts">
import { ref, computed } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";

const endpoint = ref<string>("");
const emit = defineEmits(["load"]);
const onClick = () => {
  emit("load", endpoint.value);
  endpoint.value = "";
};

const emptyEndpoint = computed(() => endpoint.value === "");

const valid = computed(() =>
  endpoint.value !== ""
    ? /^(http|https):\/\/[^ "]+$/.test(endpoint.value)
    : true
);
</script>

<template>
  <div class="mx-auto max-w-xl pt-6">
    <div>
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h2 class="mt-2 text-lg font-medium text-gray-900">Participants API</h2>
        <p class="mt-2 text-sm font-light text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi
          velit, porttitor quis consequat in, facilisis nec nisl.
        </p>
      </div>
      <div class="mt-6 flex">
        <div class="relative rounded-md shadow-sm w-full">
          <input
            type="text"
            name="endpoint"
            id="participants-api-input"
            :class="[
              {
                'text-red-900 placeholder-red-300 border-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-none':
                  !valid,
              },
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            ]"
            placeholder="Enter a valid Participants API endpoint..."
            v-model="endpoint"
            :aria-invalid="!valid"
            :aria-describedby="valid ? 'valid-endpoint' : 'endpoint-error'"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            v-show="!valid"
          >
            <ExclamationCircleIcon
              class="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        </div>
        <button
          id="load-participants-api"
          type="button"
          class="ml-4 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="onClick"
          :disabled="emptyEndpoint || !valid"
        >
          Load
        </button>
      </div>
      <p class="mt-1 text-sm text-red-600" id="endpoint-error" v-show="!valid">
        The endpoint must be a valid URL.
      </p>
    </div>
  </div>
</template>

<style scoped>
button:disabled,
button[disabled] {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  opacity: 0.65;
}
</style>
