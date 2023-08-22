import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const menuLinks: readonly string[] = ['stations', 'journeys']

export default function NavigationBar() {

  return (
    <AppBar sx={{ marginBottom: 1}} position='static'>
      <Toolbar>
        <Box sx={{ margin: 'auto', width: '50%'}}>
          <Typography variant='h6' component='a' href='/'
            sx={{
              textAlign:'left',
              fontWeight:700,
              textDecoration: 'none',
              color: 'inherit',
            }}>
          Helsinki City Bike App
          </Typography>
        </Box>

        {menuLinks.map(menuLink => 

          <Typography
            key={menuLink}
            to={menuLink} 
            variant='h6' 
            component={Link} 
            textAlign='center'
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}>
            {menuLink}
          </Typography>
        )}
        
      </Toolbar>
    </AppBar>
  );
}