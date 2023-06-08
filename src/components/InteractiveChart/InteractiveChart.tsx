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
import { convertScrollToTime, data, formatTime, options } from '../../data/chartData'
import { gsap } from 'gsap'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
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

const InteractiveChart = () => {
  const [time, setTime] = useState('')
  const scrollRef = useHorizontalScroll()
  const [isDayTime, setIsDayTime] = useState(false)
  const date = '2nd June'

  gsap.defaults({ ease: 'none' })

  ScrollTrigger.create({})

  useEffect(() => {
    document.querySelector('#chartCard')?.addEventListener('scroll', scrollHandler)

    return () => document.querySelector('#chartCard')?.removeEventListener('scroll', scrollHandler)
  }, [])

  const scrollHandler = () => {
    const chart = document.querySelector('#chartCard')
    if (chart) {
      const scrollPercentage = (chart.scrollLeft * 1.5691) / chart.scrollWidth
      setTime(formatTime(convertScrollToTime(scrollPercentage)))
    }
  }

  useEffect(() => {
    if (time > '06:00') {
      setIsDayTime(true)
    }
  }, [time])

  useEffect(() => {
    const sun = document.getElementById('sun') || ''
    if (sun) {
      if (!isDayTime) {
        sun.style.display = 'none'
      } else {
        sun.style.display = 'inline'
      }
    }
  }, [isDayTime])

  return (
    <Box className={styles.chartBox}>
      <Box id='chartCard' className={styles.chartCard} ref={scrollRef}>
        <Box id='chartContainer' className={styles.chartContainer}>
          <Line
            id='chart'
            className='chart'
            data={data}
            options={options}
            plugins={[ChartDataLabels]}
          />
        </Box>
        <Box className={styles.chartText}>
          <Stack direction='row' className={styles.chartTitle}>
            <Typography className={styles.tide}>Tide</Typography>
            <Typography className={styles.dot}> • </Typography>
            <Typography className={styles.sun}>Sunrise & Sunset</Typography>
          </Stack>
          <Typography className={styles.verticalBar} />
          <WbSunnyIcon id='sun' className={styles.sunIcon} />
          <Typography className={styles.date}>{date}</Typography>
          <Typography className={styles.time}>{time}</Typography>
        </Box>
      </Box>
      <Box className={styles.chartText}></Box>
    </Box>
  )
}

export default InteractiveChart
