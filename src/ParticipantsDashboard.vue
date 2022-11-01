<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import { ParticipantObject } from './types/participant'
import ParticipantsFilters from './components/ParticipantsFilters.vue'
import ParticipantDetails from './components/ParticipantDetails.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'

const data = reactive<{
  participants: ParticipantObject[],
  isLoading: boolean,
  endpoint: string,
}>({
  participants: [],
  isLoading: false,
  endpoint: "https://data.sandbox.directory.openbankingbrasil.org.br/participants",
})
const { participants, endpoint } = toRefs(data)

const loadParticipants = async (endpoint: string): Promise<ParticipantObject[]> =>
  await fetch(endpoint).then(val => val.json()).catch(err => console.log(err))

const onSubmit = async () => {
  const response = await loadParticipants(endpoint.value)
  participants.value = response
}

const selectedParticipant = ref<ParticipantObject>()
const details = ref<typeof ParticipantDetails | null>(null)
let viewParticipant = (participant: ParticipantObject) => {
  selectedParticipant.value = participant
  if (details.value) {
    details.value.open()
  } else {
    console.error("Failed to call unidefined component reference 'details'")
  }
}

const filters = reactive<{
  selectedRegistrationNumber?: string,
  selectedOrganisationName?: string,
  selectedCountry?: string,
  selectedCity?: string
}>({})

const filteredParticipants = computed((): ParticipantObject[] =>
  filters.selectedRegistrationNumber || filters.selectedOrganisationName || filters.selectedCountry || filters.selectedCity
  ? participants.value.filter((participant: ParticipantObject): boolean => {
    if (filters.selectedRegistrationNumber && participant.RegistrationNumber !== filters.selectedRegistrationNumber) {
      return false
    }

    if (filters.selectedOrganisationName && participant.OrganisationName !== filters.selectedOrganisationName) {
      return false
    }

    if (filters.selectedCountry && participant.Country !== filters.selectedCountry) {
      return false
    }

    if (filters.selectedCity && participant.City !== filters.selectedCity) {
      return false
    }

    return true
  })
  : participants.value
)
</script>

<template>
  <div>
    <div class="mx-auto max-w-xl pt-6">
      <div>
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 class="mt-2 text-lg font-medium text-gray-900">Participants API</h2>
          <p class="mt-2 text-sm font-light text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi velit, porttitor quis consequat in, facilisis nec nisl.</p>
        </div>
        <div class="mt-6 flex">
          <label for="endpoint" class="sr-only">Participants API Endpoint</label>
          <input type="text" name="participants-endpoint" id="endpoint" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter a valid participants endpoint" v-model="endpoint" />
          <button type="button" class="ml-4 flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="onSubmit">Load</button>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <ParticipantsFilters
        :participants="participants"
        v-show="participants.length > 0"
        class="mb-3"
        v-model:selectedRegistrationNumber="filters.selectedRegistrationNumber"
        v-model:selectedOrganisationName="filters.selectedOrganisationName"
        v-model:selectedCountry="filters.selectedCountry"
        v-model:selectedCity="filters.selectedCity"
      />
      <ParticipantsTable :participants="filteredParticipants" @view-participant="p => viewParticipant(p)" v-if="filteredParticipants.length > 0" />
      <ParticipantDetails :participant="selectedParticipant" ref="details" />
    </div>
  </div>
</template>
