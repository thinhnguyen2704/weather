import { Stack, Typography } from '@mui/material'
import { Button } from '@material-ui/core'

import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import styles from './Header.module.scss'
import { ArrowDropDown } from '@mui/icons-material'

const Header = () => {
  return (
    <header>
      <Stack direction='row' justifyContent='space-between'>
        <Button>
          <MenuIcon className={styles.headerIcon} />
        </Button>
        <Stack alignItems='center' pt='1rem'>
          <Typography className={styles.headerText}>MyENV</Typography>
          <Button
            className={styles.locationBtn}
            endIcon={<ArrowDropDown sx={{ color: 'whitesmoke' }} />}
          >
            <Typography className={styles.headerText}>Current Location</Typography>
          </Button>
        </Stack>
        <Button>
          <NotificationsIcon className={styles.headerIcon} />
        </Button>
      </Stack>
    </header>
  )
}

export default Header
