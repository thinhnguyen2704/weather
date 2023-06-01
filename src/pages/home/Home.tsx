import React from 'react'
import WeatherInfo from '../../components/WeatherInfo'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <Box className={styles.weatherContainer}>
        <Header />
        <WeatherInfo />
      </Box>
    </div>
  )
}

export default Home
