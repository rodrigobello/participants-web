<script setup lang="ts">
import { toRefs } from 'vue'
import { ParticipantObject } from '../types/participant'

const props = defineProps<{
  participants: ParticipantObject[],
}>()
const { participants } = toRefs(props)
</script>

<template>
  <div class="shadow-sm ring-1 ring-black ring-opacity-5 inline-block min-w-full align-middle">
    <table class="min-w-full border-separate" style="border-spacing: 0">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 backdrop-blur backdrop-filter hidden md:table-cell sm:pl-6">Registration Number</th>
          <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">Organisation Name</th>
          <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">Country</th>
          <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter xl:table-cell">City</th>
          <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter xl:table-cell">Postcode</th>
          <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
            <span class="sr-only">Status</span>
          </th>
          <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
            <span class="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(participant, participantIdx) in participants" :key="participant.OrganisationId">
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 hidden md:table-cell']">{{ participant.RegistrationNumber }}</td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900']">{{ participant.OrganisationName }}</td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden lg:table-cell']">{{ participant.Country }}</td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden xl:table-cell']">{{ participant.City }}</td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden xl:table-cell']">{{ participant.Postcode }}</td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500']">
            <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {{ participant.Status }}
            </span>
          </td>
          <td :class="[participantIdx !== participants.length - 1 ? 'border-b border-gray-200' : '', 'relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6']">
            <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
            @click="$emit('view-participant', participant)">
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
