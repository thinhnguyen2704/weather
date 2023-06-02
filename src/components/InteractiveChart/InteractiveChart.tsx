import styles from './InteractiveChart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
  registerables,
} from 'chart.js' // import styles from './InteractiveChart.module.scss'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { Typography } from '@material-ui/core'
import { Stack } from '@mui/material'

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ...registerables,
)

export const data = {
  labels: [
    '2023-06-02',
    '2023-06-02',
    '2023-06-03',
    '2023-06-03',
    '2023-06-04',
    '2023-06-04',
    '2023-06-05',
    '2023-06-05',
    '2023-06-06',
    '2023-06-06',
    '2023-06-07',
    '2023-06-07',
  ],
  datasets: [
    {
      data: [0.7, 4.5, 0.4, 2.3, 0.8, 3.5, 0.6, 2.7, 0.2, 3.0, 0.5, 2.4], // Meters above sea
      tension: 0.5,
      showLine: true,
      backgroundColor: 'cyan',
      // fill: {
      //   target: 'origin',
      // },
      fill: true,
    },
  ],
}
export const options = {
  scales: {
    x: {
      adapters: {
        date: { locale: 'vn' },
        distribution: 'linear',
        type: 'time',
        time: {
          parser: 'yyyy-MM-dd',
          unit: 'month',
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
}

const InteractiveChart = () => {
  return (
    <div className={styles.chartContainer}>
      <Stack direction='row' className={styles.chartTitle}>
        <Typography className={styles.tideText}>Tide</Typography>
        <Typography className={styles.dot}> • </Typography>
        <Typography className={styles.sunText}>Sunrise & Sunset</Typography>
      </Stack>
      <Line options={options} data={data} />
    </div>
  )
}

export default InteractiveChart
