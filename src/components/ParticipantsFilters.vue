<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { ParticipantObject } from '../types/participant'
import Combobox from './UI/Combobox.vue'

const props = defineProps<{
  participants: ParticipantObject[],
  selectedRegistrationNumber?: string,
  selectedOrganisationName?: string
  selectedCountry?: string
  selectedCity?: string
}>()
const { participants } = toRefs(props)

interface ComboboxItem {
   id?: number | string;
   value: string;
 }

const registrationNumbers = computed((): ComboboxItem[] =>
  [{value: "-- ALL --"}, ...participants.value.map((participant: ParticipantObject): ComboboxItem => ({
    id: participant.RegistrationNumber || "N/A",
    value: participant.RegistrationNumber || "N/A"
  }))]
)

const organisationNames = computed((): ComboboxItem[] =>
  [{value: "-- ALL --"}, ...participants.value.map((participant: ParticipantObject): ComboboxItem => ({
    id: participant.OrganisationName || "N/A",
    value: participant.OrganisationName || "N/A"
  }))]
)

const countries = computed((): ComboboxItem[] => {
  const countries: string[] = [...new Set(participants.value.map((participant: ParticipantObject) => participant.Country || "N/A"))]
  return [{value: "-- ALL --"}, ...countries.map((country: string): ComboboxItem => ({id: country, value: country}))]
})

const cities = computed((): ComboboxItem[] => {
  const cities: string[] = [...new Set(participants.value.map((participant: ParticipantObject) => participant.City || "N/A"))]
  return [{value: "-- ALL --"}, ...cities.map((city: string): ComboboxItem => ({id: city, value: city}))]
})
</script>

<template>
    <div class="flex flex-center px-4 grid grid-cols-1 sm:grid-cols-8 gap-x-4 lg:grid-cols-12">
      <Combobox label="Registration Number"
        :items="registrationNumbers"
        class="sm:col-span-2"
        :value="selectedRegistrationNumber"
        @update:modelValue="payload => $emit('update:selectedRegistrationNumber', payload ? payload.id : payload)"
      />
      <Combobox
        label="Organisation Name"
        :items="organisationNames"
        class="sm:col-span-3"
        :value="selectedOrganisationName"
        @update:modelValue="payload => $emit('update:selectedOrganisationName', payload ? payload.id : payload)"
      />
      <Combobox
        label="Country"
        :items="countries"
        class="sm:col-span-1"
        :value="selectedCountry"
        @update:modelValue="payload => $emit('update:selectedCountry', payload ? payload.id : payload)"
      />
      <Combobox
        label="City"
        :items="cities"
        class="sm:col-span-2"
        :value="selectedCity"
        @update:modelValue="payload => $emit('update:selectedCity', payload ? payload.id : payload)"
      />
    </div>
</template>
