import { ChartData } from '../utils/types'
import { format, parseISO } from 'date-fns'
import { Context } from 'chartjs-plugin-datalabels'

export const data = {
  datasets: [
    {
      // Sunrise/ sunset time
      data: [
        { x: '2023-06-02T05:45:00', y: 0 },
        { x: '2023-06-02T11:58:00', y: 4 },
        { x: '2023-06-02T17:59:00', y: 0 },
        { x: '2023-06-03T05:32:00', y: 0 },
        { x: '2023-06-03T12:18:00', y: 4 },
        { x: '2023-06-03T17:34:00', y: 0 },
        { x: '2023-06-04T05:11:00', y: 0 },
        { x: '2023-06-04T11:49:00', y: 4 },
        { x: '2023-06-04T18:13:00', y: 0 },
        { x: '2023-06-05T05:32:00', y: 0 },
        { x: '2023-06-05T12:18:00', y: 4 },
        { x: '2023-06-05T17:34:00', y: 0 },
      ],
      tension: 0.4,
      showLine: true,
      borderColor: 'orange',
      showTooltip: true,
      order: 1,
      datalabels: {
        anchor: 'end' as const,
        align: 'center' as const,
        color: 'orange',
        display: 'auto',
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
      beginAtZero: false,
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
      bottom: 20,
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
          drawTime: 'afterDatasetsDraw',
          xMin: 2,
          xMax: 3,
          backgroundColor: 'black',
        },
      },
    },
  },
}
export const formatTime = (time: number) => {
  const formattedTime = time % 24
  const decimal = formattedTime % 1
  const hr = Math.floor(formattedTime)
  const min = Math.floor(60 * decimal)
  if (hr > 12) {
    return `${hr - 12 >= 10 ? '' : '0'}${hr - 12}:${min >= 10 ? '' : '0'}${min} PM`
  } else if (hr === 0) {
    return `12:${min >= 10 ? '' : '0'}${min} PM`
  }
  return `${hr >= 10 ? '' : '0'}${hr}:${min >= 10 ? '' : '0'}${min} AM`
}

export const convertScrollToTime = (scrollPercentage: number) => {
  return (
    scrollPercentage * 60 +
    7.5 -
    (window.innerWidth > 1000 ? 0 : (1000 - window.innerWidth) / (2 * 82.3))
  )
}
