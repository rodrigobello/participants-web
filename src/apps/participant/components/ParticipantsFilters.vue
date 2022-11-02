<script setup lang="ts">
import { toRefs, computed } from "vue";
import ParticipantDTO from "@participant/dto";
import ComboBox from "@utils/UI/ComboBox.vue";

const props = defineProps<{
  participants: ParticipantDTO[];
  selectedRegistrationNumber?: string;
  selectedOrganisationName?: string;
  selectedCountry?: string;
  selectedCity?: string;
}>();
const { participants } = toRefs(props);

interface ComboboxItem {
  id?: number | string;
  value: string;
}

const registrationNumbers = computed((): ComboboxItem[] => [
  { value: "-- ALL --" },
  ...participants.value.map(
    (participant: ParticipantDTO): ComboboxItem => ({
      id: participant.RegistrationNumber || "N/A",
      value: participant.RegistrationNumber || "N/A",
    })
  ),
]);

const organisationNames = computed((): ComboboxItem[] => [
  { value: "-- ALL --" },
  ...participants.value.map(
    (participant: ParticipantDTO): ComboboxItem => ({
      id: participant.OrganisationName || "N/A",
      value: participant.OrganisationName || "N/A",
    })
  ),
]);

const countries = computed((): ComboboxItem[] => {
  const countries: string[] = [
    ...new Set(
      participants.value.map(
        (participant: ParticipantDTO) => participant.Country || "N/A"
      )
    ),
  ];
  return [
    { value: "-- ALL --" },
    ...countries.map(
      (country: string): ComboboxItem => ({ id: country, value: country })
    ),
  ];
});

const cities = computed((): ComboboxItem[] => {
  const cities: string[] = [
    ...new Set(
      participants.value.map(
        (participant: ParticipantDTO) => participant.City || "N/A"
      )
    ),
  ];
  return [
    { value: "-- ALL --" },
    ...cities.map((city: string): ComboboxItem => ({ id: city, value: city })),
  ];
});
</script>

<template>
  <div
    class="flex flex-center px-4 grid grid-cols-1 sm:grid-cols-8 gap-x-4 lg:grid-cols-12"
  >
    <ComboBox
      label="Registration Number"
      :items="registrationNumbers"
      class="sm:col-span-2"
      :value="selectedRegistrationNumber"
      @update:modelValue="
        (payload) =>
          $emit(
            'update:selectedRegistrationNumber',
            payload ? payload.id : payload
          )
      "
    />
    <ComboBox
      label="Organisation Name"
      :items="organisationNames"
      class="sm:col-span-3"
      :value="selectedOrganisationName"
      @update:modelValue="
        (payload) =>
          $emit(
            'update:selectedOrganisationName',
            payload ? payload.id : payload
          )
      "
    />
    <ComboBox
      label="Country"
      :items="countries"
      class="sm:col-span-1"
      :value="selectedCountry"
      @update:modelValue="
        (payload) =>
          $emit('update:selectedCountry', payload ? payload.id : payload)
      "
    />
    <ComboBox
      label="City"
      :items="cities"
      class="sm:col-span-2"
      :value="selectedCity"
      @update:modelValue="
        (payload) =>
          $emit('update:selectedCity', payload ? payload.id : payload)
      "
    />
  </div>
</template>
