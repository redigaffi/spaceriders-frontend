<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
  />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "BarChart",
  components: { Doughnut },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },

    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          "Liquidity",
          "Reward Pool",
          "Future IG",
          "Team",
          "Partnerships",
          "Seed Funding",
          "Private Sale",
          "IDO",
        ],
        datasets: [
          {
            label: "Tokenomics",
            data: [15, 50, 10, 2.5, 7.5, 3, 5, 7],
            backgroundColor: [
              "#D58888",
              "#674FA6",
              "#608CB4",
              "#E6C09B",
              "#E199BF",
              "#9BDC7F",
              "#CBCBCB",
              "#434343",
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            
          },
        },
      },
    };
  },
};
</script>
