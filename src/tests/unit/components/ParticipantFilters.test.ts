import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { ParticipantsFilters } from "@participant/components";
import ParticipantDTO from "@participant/dto";

describe("ParticipantsFilters.vue", () => {
  it("render display combobox with participants registration numbers", () => {
    const participants: ParticipantDTO[] = [
      {
        RegistrationNumber: "12345",
        OrganisationName: "Mock Organisation",
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        OrganisationName: "Mock Organisation",
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
    ];

    const wrapper = shallowMount(ParticipantsFilters, {
      props: { participants },
    });

    const expectedItems = [
      { value: "-- ALL --" },
      { id: "12345", value: "12345" },
      { id: "N/A", value: "N/A" },
    ];

    expect(
      wrapper.findComponent({ ref: "registration-numbers-combobox" }).props()
        .items
    ).toStrictEqual(expectedItems);
  });

  it("render display combobox with participants organisation names", () => {
    const participants: ParticipantDTO[] = [
      {
        RegistrationNumber: "12345",
        OrganisationName: "Mock Organisation",
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
    ];

    const wrapper = shallowMount(ParticipantsFilters, {
      props: { participants },
    });

    const expectedItems = [
      { value: "-- ALL --" },
      { id: "Mock Organisation", value: "Mock Organisation" },
      { id: "N/A", value: "N/A" },
    ];

    expect(
      wrapper.findComponent({ ref: "organisation-names-combobox" }).props()
        .items
    ).toStrictEqual(expectedItems);
  });

  it("render display combobox with participants cities", () => {
    const participants: ParticipantDTO[] = [
      {
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        Country: "UK",
        City: "LONDON",
        CreatedOn: "2021-01-01",
      },
      {
        Country: "",
        City: "",
        CreatedOn: "2021-01-01",
      },
    ];

    const wrapper = shallowMount(ParticipantsFilters, {
      props: { participants },
    });

    const expectedItems = [
      { value: "-- ALL --" },
      { id: "SAO PAULO", value: "SAO PAULO" },
      { id: "LONDON", value: "LONDON" },
      { id: "N/A", value: "N/A" },
    ];

    expect(
      wrapper.findComponent({ ref: "cities-combobox" }).props().items
    ).toStrictEqual(expectedItems);
  });
});
