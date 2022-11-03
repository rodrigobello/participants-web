import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { ParticipantsTable } from "@participant/components";
import ParticipantDTO from "@participant/dto";

describe("ParticipantsTable.vue", () => {
  const participant: ParticipantDTO = {
    RegistrationNumber: "12345",
    OrganisationName: "Mock Organisation",
    Country: "BR",
    City: "SAO PAULO",
    CreatedOn: "2021-01-01",
    Status: "Active",
  };

  const wrapper = shallowMount(ParticipantsTable, {
    props: { participants: [participant] },
  });

  it("render display participant fields in table row", () => {
    expect(wrapper.find("[data-testid=registration-number]").text()).toContain(
      participant.RegistrationNumber
    );
    expect(wrapper.find("[data-testid=organisation-name]").text()).toContain(
      participant.OrganisationName
    );
    expect(wrapper.find("[data-testid=country]").text()).toContain(
      participant.Country
    );
    expect(wrapper.find("[data-testid=city]").text()).toContain(
      participant.City
    );
    expect(wrapper.find("[data-testid=status]").text()).toContain(
      participant.Status
    );
  });

  it("click on view button emits event with participant in the payload", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()["view-participant"]).toBeTruthy();
    expect(wrapper.emitted()["view-participant"].length).toBe(1);
    expect(wrapper.emitted()["view-participant"][0]).toStrictEqual([
      participant,
    ]);
  });
});
