/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from 'chart.js' // import styles from './InteractiveChart.module.scss'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { Typography } from '@material-ui/core'
import { Box, Stack } from '@mui/material'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { format, parseISO } from 'date-fns'

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
  ChartDataLabels,
)

export const data = {
  datasets: [
    {
      // Sunrise/ sunset time
      data: [
        { x: '2023-06-02T05:45:00', y: 0 },
        { x: '2023-06-02T11:58:00', y: 7 },
        { x: '2023-06-02T17:59:00', y: 0 },
        { x: '2023-06-03T05:32:00', y: 0 },
        { x: '2023-06-03T12:18:00', y: 7 },
        { x: '2023-06-03T17:34:00', y: 0 },
        { x: '2023-06-04T05:11:00', y: 0 },
        { x: '2023-06-04T11:49:00', y: 7 },
        { x: '2023-06-04T18:13:00', y: 0 },
        { x: '2023-06-05T05:32:00', y: 0 },
        { x: '2023-06-05T12:18:00', y: 7 },
        { x: '2023-06-05T17:34:00', y: 0 },
      ],
      tension: 0.4,
      showLine: true,
      borderColor: 'orange',
      showTooltip: true,
      order: 1,
      datalabels: {
        color: 'orange',
      },
    },
    {
      // Tide: Meters above sea
      data: [
        { x: '2023-06-02T02:03:00', y: 0.7 },
        { x: '2023-06-02T08:32:00', y: 4.5 },
        { x: '2023-06-02T14:22:00', y: 0.4 },
        { x: '2023-06-02T20:02:00', y: 2.3 },
        { x: '2023-06-03T01:58:00', y: 0.8 },
        { x: '2023-06-03T10:27:00', y: 3.5 },
        { x: '2023-06-03T13:50:00', y: 0.6 },
        { x: '2023-06-03T21:46:00', y: 2.7 },
        { x: '2023-06-04T00:39:00', y: 0.2 },
        { x: '2023-06-04T11:07:00', y: 3.0 },
        { x: '2023-06-04T15:38:00', y: 0.5 },
        { x: '2023-06-04T22:22:00', y: 2.4 },
        { x: '2023-06-05T01:36:00', y: 0.4 },
        { x: '2023-06-05T10:49:00', y: 3.2 },
        { x: '2023-06-05T14:50:00', y: 0.9 },
        { x: '2023-06-05T22:46:00', y: 1.7 },
      ],
      tension: 0.5,
      showLine: false,
      backgroundColor: 'cyan',
      fill: true,
      showTooltip: true,
      order: 2,
      datalabels: {
        align: 'center' as const,
        anchor: 'center' as const,
        backgroundColor: 'white',
        color: 'navy',
        borderRadius: 5,
        opacity: 0.65,
        textAlign: 'center' as const,
      },
    },
  ],
}
export const options = {
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'hour' as const,
      },
      grid: {
        display: false,
      },
      display: false,
    },
    y: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 40,
      right: 40,
      top: 70,
      bottom: 30,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      formatter: (value: any, context: { datasetIndex: any }) => {
        return (
          format(parseISO(value.x), 'hh:mm a') +
          `\n` +
          (context.datasetIndex === 1 ? +' ' + value.y + 'm' : '')
        )
      },
      font: {
        size: 15,
      },
      margin: {
        top: 30 as const,
      },
    },
  },
}

const InteractiveChart = () => {

  return (
    <Box className={styles.interactiveChart}>
      <Box className={styles.chartContainer}>
        <Stack direction='row' className={styles.chartTitle}>
          <Typography className={styles.tide} style={{ color: '#31667a' }}>
            Tide
          </Typography>
          <Typography className={styles.dot}> • </Typography>
          <Typography className={styles.sun}>Sunrise & Sunset</Typography>
        </Stack>
        <Line
          data={data}
          options={options}
          plugins={[ChartDataLabels]}
        />
      </Box>
    </Box>
  )
}

export default InteractiveChart
