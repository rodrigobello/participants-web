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
    <div class="mt-10" v-if="data.participants.length > 0">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
              <div class="shadow-sm ring-1 ring-black ring-opacity-5">
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
                    <tr v-for="(participant, participantIdx) in data.participants" :key="participant.OrganisationId">
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 hidden md:table-cell']">{{ participant.RegistrationNumber }}</td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900']">{{ participant.OrganisationName }}</td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden lg:table-cell']">{{ participant.Country }}</td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden xl:table-cell']">{{ participant.City }}</td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500 hidden xl:table-cell']">{{ participant.Postcode }}</td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-2 py-2 text-sm text-gray-500']">
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {{ participant.Status }}
                        </span>
                      </td>
                      <td :class="[participantIdx !== data.participants.length - 1 ? 'border-b border-gray-200' : '', 'relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6']">
                        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ParticipantObject } from './types/participant'
const data = reactive<{participants: ParticipantObject[], isLoading: boolean}>({participants: [], isLoading: false})
const endpoint = ref("https://data.sandbox.directory.openbankingbrasil.org.br/participants")
const loadParticipants = async (endpoint: string) =>
  await fetch(endpoint).then(val => val.json()).catch(err => console.log(err))


const onSubmit = async () => {
  const response = await request<ParticipantObject[]>(endpoint.value, {
    method: 'get',
  })

  if (response.ok) {
    data.participants = response.data
  }
}

interface SuccessfulResponse<Data extends Record<string, any>> {
  ok: true
  data: Data
}

interface ErrorResponse {
  ok: false
  data: undefined
}

type RequestResponse<Data extends Record<string, any>> =
  | SuccessfulResponse<Data>
  | ErrorResponse

const request = async <Data extends Record<string, any>>(
  url: string,
  options: RequestInit,
): Promise<RequestResponse<Data>> => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return {
      ok: true,
      data,
    }
  } catch (e) {
    return {
      ok: false,
      data: undefined,
    }
  }
}


</script>
