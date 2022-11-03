<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ParticipantDTO from "@participant/dto";
import useParticipantStore from "@participant/stores";
import {
  ParticipantsFilters,
  ParticipantDetails,
  ParticipantsTable,
  ParticipantsCharts,
  ParticipantsEndpointInput,
} from "@participant/components";
import ErrorNotification from "@utils/UI/ErrorNotification.vue";
import LoadingAnimation from "@utils/UI/LoadingAnimation.vue";

const store = useParticipantStore();
const { isLoading, participants, filteredParticipants } = storeToRefs(store);
const { loadParticipants, filters } = store;

const notification = ref<typeof ErrorNotification | null>(null);
const loadEndpoint = async (endpoint: string) => {
  loadParticipants(endpoint).catch((err: string) => {
    console.error(err);
    if (notification.value) {
      notification.value.display(
        "Unable to fetch data from the informed API endpoint."
      );
    }
  });
};

const selectedParticipant = ref<ParticipantDTO>();
const details = ref<typeof ParticipantDetails | null>(null);
let viewParticipant = (participant: ParticipantDTO) => {
  selectedParticipant.value = participant;
  if (details.value) {
    details.value.open();
  } else {
    console.error("Failed to call unidefined component reference 'details'");
  }
};
</script>

<template>
  <div>
    <ParticipantsEndpointInput @load="loadEndpoint" />
    <ErrorNotification ref="notification" />
    <LoadingAnimation
      class="flex flex-center justify-center mt-20"
      v-show="isLoading"
    />
    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-from-class="-translate-y-12 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-12"
    >
      <div class="mt-12 mb-12" v-if="participants.length > 0" id="participants-response">
        <ParticipantsCharts
          :participants="participants"
          v-if="participants.length > 0"
          class="mb-12"
        />
        <ParticipantsFilters
          :participants="participants"
          class="mb-3"
          v-model:selectedRegistrationNumber="
            filters.selectedRegistrationNumber
          "
          v-model:selectedOrganisationName="filters.selectedOrganisationName"
          v-model:selectedCountry="filters.selectedCountry"
          v-model:selectedCity="filters.selectedCity"
        />
        <ParticipantsTable
          :participants="filteredParticipants"
          @view-participant="(p) => viewParticipant(p)"
          v-if="filteredParticipants.length > 0"
        />
        <ParticipantDetails :participant="selectedParticipant" ref="details" />
      </div>
    </transition>
  </div>
</template>
