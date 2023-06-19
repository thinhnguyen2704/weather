import styles from './WeatherInfo.module.scss'
import { Button, Typography } from '@material-ui/core'
import { Stack } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const WeatherInfo = () => {
  return (
    <>
      <Stack className={styles.weatherStat}>
        <Stack className={styles.weatherStatStack} gap='1.5rem'>
          <WbSunnyIcon sx={{ fontSize: '5rem' }} />
          <Stack>
            <Typography variant='h3'>Sunny</Typography>
            <Stack direction='row' gap='3rem'>
              <Stack className={styles.weatherStatStack}>
                <DeviceThermostatIcon className={styles.weatherIcon} />
                <Typography className={styles.weatherStatTextLarge}>27°C</Typography>
              </Stack>
              <Stack className={styles.weatherStatStack} gap='0.2rem'>
                <WaterDropIcon className={styles.weatherIcon} />
                <Typography className={styles.weatherStatTextLarge}>88%</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack className={styles.weatherStatStack}>
        <Stack className={styles.columnStatStack}>
          <Typography className={styles.weatherStatTextSmall}>PSI</Typography>
          <Typography className={styles.psiText}>24</Typography>
          <Typography className={styles.weatherStatTextSmall}>Good</Typography>
        </Stack>
        <Stack className={styles.columnStatStack}>
          <Typography className={styles.weatherStatTextSmall}>RAIN</Typography>
          <Typography className={styles.rainPrecipitation} style={{}}>
            4
          </Typography>
          <Typography className={styles.weatherStatTextSmall}>mm</Typography>
        </Stack>
        <Stack className={styles.columnStatStack}>
          <Typography className={styles.weatherStatTextSmall}>DENGUE</Typography>
          <span className={styles.dengueCircle}></span>
        </Stack>
        <Stack
          sx={{
            width: '60px',
            height: '55px',
            padding: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button>
            <AddCircleIcon className={styles.weatherStatButton} />
          </Button>
          <Typography className={styles.weatherStatTextSmall}>Add</Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default WeatherInfo
