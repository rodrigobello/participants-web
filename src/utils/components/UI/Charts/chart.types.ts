export interface BarChartData {
  labels: string[];
  datasets: {
    label?: string;
    backgroundColor?: string;
    data: number[];
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}
