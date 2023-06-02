import React from 'react'
import WeatherInfo from '../../components/WeatherInfo'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import styles from './Home.module.scss'
import InteractiveChart from '../../components/InteractiveChart'

const Home = () => {
  return (
    <div>
      <Box className={styles.weatherContainerWrapper}>
        <Box className={styles.weatherContainer}>
          <Header />
          <WeatherInfo />
        </Box>
      </Box>
      <Box className={styles.interactiveChart} component='div'>
        <InteractiveChart />
      </Box>
    </div>
  )
}

export default Home
