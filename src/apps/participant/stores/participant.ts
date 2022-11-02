import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import ParticipantDTO from "@participant/dto";

export const useParticipantStore = defineStore("participant", () => {
  const participants = ref<ParticipantDTO[]>([]);
  const isLoading = ref<boolean>(false);

  const loadParticipants = async (endpoint: string) => {
    isLoading.value = true;
    return fetch(endpoint)
      .then(async (resp) => {
        participants.value = await resp.json();
      })
      .finally(() => (isLoading.value = false));
  };

  const filters = reactive<{
    selectedRegistrationNumber?: string;
    selectedOrganisationName?: string;
    selectedCountry?: string;
    selectedCity?: string;
  }>({});

  const filteredParticipants = computed((): ParticipantDTO[] =>
    filters.selectedRegistrationNumber ||
    filters.selectedOrganisationName ||
    filters.selectedCountry ||
    filters.selectedCity
      ? participants.value.filter((participant: ParticipantDTO): boolean => {
          if (
            filters.selectedRegistrationNumber &&
            participant.RegistrationNumber !==
              filters.selectedRegistrationNumber
          ) {
            return false;
          }

          if (
            filters.selectedOrganisationName &&
            participant.OrganisationName !== filters.selectedOrganisationName
          ) {
            return false;
          }

          if (
            filters.selectedCountry &&
            participant.Country !== filters.selectedCountry
          ) {
            return false;
          }

          if (
            filters.selectedCity &&
            participant.City !== filters.selectedCity
          ) {
            return false;
          }

          return true;
        })
      : participants.value
  );

  return {
    loadParticipants,
    isLoading,
    participants,
    filteredParticipants,
    filters,
  };
});
