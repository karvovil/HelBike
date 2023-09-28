import { Box, Typography } from '@mui/material';

const FrontPage = () => {
  return (
    <Box sx={{ width: '45%', margin: 'auto', align: 'center' }}>
      <Typography variant='h4' align='center' fontWeight={600}>
        HSL city bike stations and journeys
      </Typography>
      <Box
        component='img'
        src={process.env.PUBLIC_URL + '/favicon.ico'}
        title='logo'
        sx={{ width: '100%', margin: 'auto' }} />
      <Typography align='center' fontStyle='oblique' fontSize={12}>
        Service for displaying data from journeys made with city bikes in the Helsinki Capital area.
        Data includes journeys made in 2021 and is owned by <a href="https://www.citybikefinland.fi/">City Bike Finland</a>
      </Typography>
    </Box>
  );
}
export default FrontPage