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
import DarkModeIcon from '@mui/icons-material/DarkMode'

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
  const [AMPMTime, setAMPMTime] = useState('')
  const scrollRef = useHorizontalScroll()
  const [date, setDate] = useState('2nd June')

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
      const { normalTime, AMPMTime } = formatTime(convertScrollToTime(scrollPercentage))
      setTime(normalTime)
      setAMPMTime(AMPMTime)
      if (scrollPercentage < 0.341) {
        setDate('2nd June')
      } else if (scrollPercentage > 0.341 && scrollPercentage < 0.741) {
        setDate('3rd June')
      } else if (scrollPercentage > 0.741 && scrollPercentage < 1.141) {
        setDate('4th June')
      } else {
        setDate('5th June')
      }
    }
  }

  useEffect(() => {
    const sun = document.getElementById('sun') || ''
    const moon = document.getElementById('moon') || ''
    if (sun && moon) {
      if (time >= '05:05' && time <= '18:30') {
        sun.style.display = 'inline'
        moon.style.display = 'none'
      } else {
        sun.style.display = 'none'
        moon.style.display = 'inline'
      }
    }
  }, [time])

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
          <WbSunnyIcon id='sun' className={styles.barIcon} />
          <DarkModeIcon id='moon' className={styles.barIcon} />
          <Typography className={styles.date}>{date}</Typography>
          <Typography className={styles.time}>{AMPMTime}</Typography>
        </Box>
      </Box>
      <Box className={styles.chartText}></Box>
    </Box>
  )
}

export default InteractiveChart
