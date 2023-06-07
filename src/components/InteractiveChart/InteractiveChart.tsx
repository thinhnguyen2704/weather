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
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'
import { format, parseISO } from 'date-fns'
import { data } from '../../data/chartData'
import { gsap } from 'gsap'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ChartData } from '../utils/types'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'

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

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

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
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      formatter: (value: ChartData, context: Context) => {
        return (
          format(parseISO(value.x), 'hh:mm a') +
          `\n` +
          (context.datasetIndex === 1 ? +' ' + value.y + 'm' : '')
        )
      },
      font: {
        size: 15,
      },
    },
    annotation: {
      annotations: {
        nightTime1: {
          type: 'box',
          drawTime: 'beforeDatasetsDraw',
          xMin: 2,
          xMax: 3,
          backgroundColor: 'black',
        },
      },
    },
  },
}

const InteractiveChart = () => {
  const [isDayTime, setIsDayTime] = useState(false)
  const scrollRef = useHorizontalScroll()
  console.log(isDayTime, setIsDayTime)
  const barDate = '6th June'

  gsap.defaults({ ease: 'none' })

  ScrollTrigger.create({})

  // const main = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '#chart',
  //     scrub: true,
  //   }
  // })

  return (
    <Box className={styles.chartBox}>
      <Box className={styles.chartCard} ref={scrollRef}>
        <Box className={styles.chartContainer}>
          <Line
            id='chart'
            className={styles.chart}
            data={data}
            options={options}
            plugins={[ChartDataLabels]}
          />
        </Box>
        <Box className={styles.chartText} >
          <Stack direction='row' className={styles.chartTitle}>
            <Typography className={styles.tide}>Tide</Typography>
            <Typography className={styles.dot}> • </Typography>
            <Typography className={styles.sun}>Sunrise & Sunset</Typography>
          </Stack>
          <Typography className={styles.verticalBar} />
          <WbSunnyIcon className={styles.sunIcon} />
          <Typography className={styles.barDate}>{barDate}</Typography>
        </Box>
      </Box>
      <Box className={styles.chartText}></Box>
    </Box>
  )
}

export default InteractiveChart
