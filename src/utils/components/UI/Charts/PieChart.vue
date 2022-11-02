<template>
  <Pie
    :chart-options="props.options"
    :chart-data="props.data"
    :chart-id="props.chartId"
    :width="props.width"
    :height="props.height"
    :css-classes="props.cssClasses"
    :styles="props.styles"
    :plugins="props.plugins"
  />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartType, Plugin
} from 'chart.js'
import { TChartOptions } from 'vue-chartjs/dist/types'
import { PieChartData } from './chart.types'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

interface Props {
  chartId?: string
  width?: number,
  height?: number,
  cssClasses?: string,
  styles?: Partial<CSSStyleDeclaration>,
  plugins?: Plugin<'pie'>[],
  data?: PieChartData,
  options?: TChartOptions<ChartType>
}

const props = withDefaults(defineProps<Props>(), {
  chartId: 'pie-chart',
  width: 400,
  height: 400,
  cssClasses: '',
  styles: () => ({}),
  plugins: () => [],
  data: (): PieChartData => ({
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10]
      }
    ]
  }),
  options: () => ({
    responsive: true,
    maintainAspectRatio: false
  })
})
</script>
