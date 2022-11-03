import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { ParticipantsCharts } from "@participant/components";
import ParticipantDTO from "@participant/dto";
import { BarChartData, PieChartData } from "@utils/UI/Charts";

describe("ParticipantsCharts.vue", () => {
  it("render builds chart for participants countries", () => {
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
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-01-01",
      },
      {
        Country: "UK",
        City: "LONDON",
        CreatedOn: "2021-01-01",
      },
    ];

    const wrapper = shallowMount(ParticipantsCharts, {
      props: { participants },
    });

    const expectedData: PieChartData = {
      labels: ["BR", "UK"],
      datasets: [
        {
          backgroundColor: ["rgb(79,70,229)", "rgb(79,70,229)"],
          data: [3, 1],
        },
      ],
    };

    expect(
      wrapper.findComponent({ ref: "participants-countries-chart" }).props()
        .data
    ).toStrictEqual(expectedData);
  });

  it("render builds chart for participants timeline", () => {
    const participants: ParticipantDTO[] = [
      {
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-02-24T13:40:24.442Z",
      },
      {
        Country: "BR",
        City: "SAO PAULO",
        CreatedOn: "2021-11-30T13:40:24.442Z",
      },
      {
        Country: "UK",
        City: "LONDON",
        CreatedOn: "2022-08-05T13:40:24.442Z",
      },
    ];

    const wrapper = shallowMount(ParticipantsCharts, {
      props: { participants },
    });

    const expectedData: BarChartData = {
      labels: [
        "01/05/2021",
        "06/07/2021",
        "10/09/2021",
        "15/11/2021",
        "19/01/2022",
        "26/03/2022",
        "31/05/2022",
        "05/08/2022",
      ],
      datasets: [
        {
          backgroundColor: "rgb(79,70,229)",
          data: [1, 1, 1, 1, 2, 2, 2, 3],
          label: "Organisation Count in Directory",
        },
      ],
    };

    expect(
      wrapper.findComponent({ ref: "participants-timeline-chart" }).props().data
    ).toStrictEqual(expectedData);
  });
});
