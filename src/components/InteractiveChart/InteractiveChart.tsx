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

const positioner = (el: {
  startAngle: any
  endAngle: any
  outerRadius: any
  x: number
  y: number
}) => {
  const angle = (el.startAngle + el.endAngle) / 2
  const vx = Math.cos(angle)
  const vy = Math.sin(angle)
  const r = el.outerRadius

  return {
    x: el.x + vx * r,
    y: el.y + vy * r,
    vx,
    vy,
  }
}
export const externalTooltipHandler = (context: { chart: any; tooltip: any }) => {
  const { chart, tooltip } = context
  const point = tooltip?.dataPoints?.[0]?.raw ?? {}

  if (point.showTooltip) {
    let tooltipEl = chart.canvas.parentNode.querySelector(`#${point.id}`)

    if (!tooltipEl) {
      const position = positioner(tooltip._active[0]?.element)
      const { width, height } = chart.canvas.getBoundingClientRect()
      const isTooltipLeft = position.x < width / 2
      const isTooltipTop = position.y < height / 2
      const borderRadius = tooltipBorderRadius(isTooltipLeft, isTooltipTop)

      // const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
      tooltipEl = document.createElement('div')
      tooltipEl.setAttribute('id', point.id)
      tooltipEl.classList.add('chart-donut-data-label')
      tooltipEl.style.borderRadius = borderRadius
      tooltipEl.style.left = position.x - 4 * position.vx + 'px'
      tooltipEl.style.top = position.y - 4 * position.vy + 'px'
      tooltipEl.style.transform = `translate(${isTooltipLeft ? -100 : 0}%, ${
        isTooltipTop ? -100 : 0
      }%)`

      const body = Math.round(point.value * 100) + '%'
      const colors = tooltip.labelColors[0]
      const text = document.createTextNode(body)
      const span = document.createElement('span')
      span.classList.add('chart-donut-label-color-box')
      span.style.background = colors.backgroundColor
      span.style.borderColor = colors.borderColor
      tooltipEl.appendChild(span)
      tooltipEl.appendChild(text)
      chart.canvas.parentNode.appendChild(tooltipEl)
    }
  }
}

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
      fill: true,
      showTooltip: true,
    },
    {
      data: [0, 6, 0, 6, 0, 6, 0, 6, 0, 7, 0, 7, 0, 7, 0, 7],
      tension: 0.5,
      showLine: true,
      showTooltip: true,
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
    tooltip: {
      enabled: false,
    },
  },
}

const tooltipBorderRadius = (isTooltipLeft: boolean, isTooltipTop: boolean) =>
  isTooltipLeft
    ? isTooltipTop
      ? '6px 6px 0 6px'
      : '6px 0 6px 6px'
    : isTooltipTop
    ? '6px 6px 6px 0'
    : '0 6px 6px 6px'

const InteractiveChart = () => {
  return (
    <div className={styles.chartContainer}>
      <Stack direction='row' className={styles.chartTitle}>
        <Typography className={styles.tideText} style={{ color: '#31667a' }}>
          Tide
        </Typography>
        <Typography className={styles.dot}> • </Typography>
        <Typography className={styles.sunText}>Sunrise & Sunset</Typography>
      </Stack>
      <Line options={options} data={data} />
    </div>
  )
}

export default InteractiveChart
