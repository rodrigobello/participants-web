<script setup lang="ts">
import { toRefs, computed } from "vue";
import ParticipantDTO from "@participant/dto";
import {
  BarChart,
  PieChart,
  BarChartData,
  PieChartData,
} from "@utils/UI/Charts";
import { getMinAndMaxDate, getIncrementalDatesArray } from "@helpers/dates";
import moment from "moment";

const props = defineProps<{
  participants: ParticipantDTO[];
}>();
const { participants } = toRefs(props);
const blueColor = "rgb(79,70,229)";

const locationChartData = computed((): PieChartData => {
  const countryMap: {
    [country: string]: number;
  } = {};

  participants.value.forEach((participant: ParticipantDTO): void => {
    if (!(participant.Country in countryMap)) {
      countryMap[participant.Country] = 0;
    }
    countryMap[participant.Country] += 1;
  });

  const countryLabels = Object.keys(countryMap);
  const countryData = Object.values(countryMap);
  const countryColors = countryData.map(() => blueColor);

  return {
    labels: countryLabels,
    datasets: [
      {
        backgroundColor: countryColors,
        data: countryData,
      },
    ],
  };
});

const timeLineChartData = computed((): BarChartData => {
  const organisationDates = participants.value.map((p) => p.CreatedOn);
  const [minDateStr, maxDateStr] = getMinAndMaxDate(organisationDates);
  const chartDates: string[] = getIncrementalDatesArray(
    minDateStr,
    maxDateStr,
    8
  );
  const chartMap: {
    [date: string]: number;
  } = {};

  organisationDates.forEach((organisationDate: string): void => {
    chartDates.forEach((chartDate) => {
      if (!(chartDate in chartMap)) {
        chartMap[chartDate] = 0;
      }

      if (organisationDate <= chartDate) {
        chartMap[chartDate] += 1;
      }
    });
  });

  return {
    labels: chartDates.map((date) => moment(date).format("DD/MM/YYYY")),
    datasets: [
      {
        label: "Organisation Count in Directory",
        backgroundColor: blueColor,
        data: Object.values(chartMap),
      },
    ],
  };
});

const buildChartOptions = (title: string) => ({
  plugins: { title: { text: title, display: true } },
});
</script>

<template>
  <div class="2xl:w-1/2 w-3/4 mx-auto">
    <div class="flex flex-center align-items-center justify-between">
      <BarChart
        :data="timeLineChartData"
        :options="
          buildChartOptions(
            'Count of participants registered in the directory over time'
          )
        "
      />
      <PieChart
        :data="locationChartData"
        :options="
          buildChartOptions(
            'Countries of participants registered in the directory'
          )
        "
        :width="350"
      />
    </div>
  </div>
</template>
