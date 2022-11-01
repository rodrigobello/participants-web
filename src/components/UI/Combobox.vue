<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

interface ComboboxItem {
   id?: number | string;
   value: string;
 }

const props = defineProps<{
  label: string,
  items: ComboboxItem[]
}>()

const { label, items } = toRefs(props)

const query = ref('')
const filteredItems = computed((): ComboboxItem[] =>
  query.value === ''
    ? items.value
    : items.value.filter(item => {
        return item.value.toLowerCase().includes(query.value.toLowerCase())
      })
)
</script>

<template>
  <Combobox as="div" @update:modelValue="payload => $emit('update', payload)">
    <ComboboxLabel class="block text-xs font-medium text-gray-700">{{ label }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-xs" @change="query = $event.target.value" :display-value="item => (item as ComboboxItem)?.value" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredItems.length > 0" class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
        <ComboboxOption v-for="item in filteredItems" :key="item.id" :value="item" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ item.value }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
