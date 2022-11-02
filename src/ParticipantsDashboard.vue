<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import { ParticipantObject } from './types/participant'
import ParticipantsFilters from './components/ParticipantsFilters.vue'
import ParticipantDetails from './components/ParticipantDetails.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
import ParticipantsCharts from './components/ParticipantsCharts.vue'
import ParticipantsEndpointInput from './components/ParticipantsEndpointInput.vue'
import ErrorNotification from '@utils/UI/ErrorNotification.vue'
import Loading from '@utils/UI/Loading.vue'

const data = reactive<{
  participants: ParticipantObject[],
  isLoading: boolean,
}>({
  participants: [],
  isLoading: false,
})
const { participants, isLoading } = toRefs(data)

const notification = ref<typeof ErrorNotification | null>(null)
const onInput = async (endpoint: string) => {
  data.isLoading = true
  const response = await fetch(endpoint).then(val => val.json()).catch(err => {
    console.error(err)
    if (notification.value) {
      notification.value.display("Unable to fetch data from the informed API endpoint.")
    }
  })
  data.isLoading = false
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
    <ParticipantsEndpointInput @input="onInput" />
    <ErrorNotification ref="notification" />
    <Loading class="flex flex-center justify-center mt-20" v-show="isLoading" />
    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-from-class="-translate-y-12 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-12"
    >
      <div class="mt-12 mb-12" v-if="participants.length > 0">
        <ParticipantsCharts :participants="participants" v-if="filteredParticipants.length > 0" class="mb-12" />
        <ParticipantsFilters
          :participants="participants"
          class="mb-3"
          v-model:selectedRegistrationNumber="filters.selectedRegistrationNumber"
          v-model:selectedOrganisationName="filters.selectedOrganisationName"
          v-model:selectedCountry="filters.selectedCountry"
          v-model:selectedCity="filters.selectedCity"
        />
        <ParticipantsTable :participants="filteredParticipants" @view-participant="p => viewParticipant(p)" v-if="filteredParticipants.length > 0" />
        <ParticipantDetails :participant="selectedParticipant" ref="details" />
      </div>
    </transition>
  </div>
</template>
