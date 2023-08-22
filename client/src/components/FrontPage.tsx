import { Box, Typography } from '@mui/material';

const FrontPage = () => {
  return(
    <Box sx={{ width:'45%', margin:'auto', align:'center'}}>
      <Box
        component='img'
        src={process.env.PUBLIC_URL + '/favicon.ico'}
        title='logo'
        sx={{ width: '100%', margin: 'auto' }}
      />
      <Typography variant='h4' align='center' fontWeight={600}>
        HSL city bike stations and journeys
      </Typography>
    </Box>
  )}
export default FrontPage