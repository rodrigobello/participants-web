<template>
  <Bar
    :chart-options="props.options"
    :chart-data="props.data"
    :chart-id="props.chartId"
    :dataset-id-key="props.datasetIdKey"
    :plugins="props.plugins"
    :css-classes="props.cssClasses"
    :styles="props.styles"
    :width="props.width"
    :height="props.height"
  />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartType, Plugin } from 'chart.js'
import { TChartOptions } from 'vue-chartjs/dist/types'
import { BarChartData } from './chart.types'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  chartId?: string,
  datasetIdKey?: string,
  width?: number,
  height?: number,
  cssClasses?: string,
  styles?: Partial<CSSStyleDeclaration>,
  plugins?: Plugin<'bar'>[],
  data?: BarChartData,
  options?: TChartOptions<ChartType>
}

const props = withDefaults(defineProps<Props>(), {
  chartId: 'pie-chart',
  datasetIdKey: 'label',
  width: 400,
  height: 400,
  cssClasses: '',
  styles: () => ({}),
  plugins: () => [],
  data: (): BarChartData => ({
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  }),
  options: () => ({
    responsive: true
  })
})
</script>
