import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import {
  useParticipantStore,
  participantsService,
} from "@participant/stores/participant";
import ParticipantDTO from "@participant/dto";

describe("Participant Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loadParticipants", () => {
    const participant: ParticipantDTO = {
      RegistrationNumber: "12345",
      OrganisationName: "Mock Organisation",
      Country: "BR",
      City: "SAO PAULO",
      CreatedOn: "2021-01-01",
      Status: "Active",
    };

    it("set participants state with service request response", async () => {
      participantsService.loadFromAPI = vi.fn(() =>
        Promise.resolve([participant])
      );
      const store = useParticipantStore();
      await store.loadParticipants("foobar");
      expect(participantsService.loadFromAPI).toBeCalledTimes(1);
      expect(store.participants).toStrictEqual([participant]);
      expect(store.isLoading).toBe(false);
    });

    it("does not set participants state when service request fails", async () => {
      participantsService.loadFromAPI = vi.fn(() =>
        Promise.reject(new Error("api fail"))
      );
      const store = useParticipantStore();

      await expect(store.loadParticipants("foobar")).rejects.toThrow(
        "api fail"
      );
      expect(participantsService.loadFromAPI).toBeCalledTimes(1);
      expect(store.participants).toStrictEqual([]);
      expect(store.isLoading).toBe(false);
    });
  });

  describe("filteredParticipants", () => {
    const participants: ParticipantDTO[] = [
      {
        RegistrationNumber: "12345",
        OrganisationName: "Mock Organisation",
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        RegistrationNumber: "6789",
        OrganisationName: "Mock Organisation2",
        Country: "UK",
        City: "LONDON",
        CreatedOn: "2021-01-01",
      },
    ];

    it("return all participants when there is no filter set", () => {
      const store = useParticipantStore();
      store.participants = participants;
      expect(store.filteredParticipants.length).toBe(2);
      expect(store.filteredParticipants).toStrictEqual(participants);
    });

    it("filter participants by registration number", () => {
      const store = useParticipantStore();
      store.participants = participants;
      store.filters.selectedRegistrationNumber =
        participants[0].RegistrationNumber;
      expect(store.filteredParticipants.length).toBe(1);
      expect(store.filteredParticipants).toStrictEqual([participants[0]]);
    });

    it("filter participants by organisation name", () => {
      const store = useParticipantStore();
      store.participants = participants;
      store.filters.selectedOrganisationName = participants[1].OrganisationName;
      expect(store.filteredParticipants.length).toBe(1);
      expect(store.filteredParticipants).toStrictEqual([participants[1]]);
    });

    it("filter participants by country", () => {
      const store = useParticipantStore();
      store.participants = participants;
      store.filters.selectedCountry = participants[0].Country;
      expect(store.filteredParticipants.length).toBe(1);
      expect(store.filteredParticipants).toStrictEqual([participants[0]]);
    });

    it("filter participants by city", () => {
      const store = useParticipantStore();
      store.participants = participants;
      store.filters.selectedCity = participants[1].City;
      expect(store.filteredParticipants.length).toBe(1);
      expect(store.filteredParticipants).toStrictEqual([participants[1]]);
    });
  });
});
