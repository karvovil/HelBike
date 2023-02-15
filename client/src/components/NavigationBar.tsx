import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const menuLinks: readonly string[] = ['/', '/stations', '/journeys']

export default function NavigationBar() {

  return (
    <AppBar position="static">
      <Toolbar>
        {menuLinks.map(menuLink => 

          <Typography
            key={menuLink}
            href={menuLink} 
            variant="h6" 
            component="a" 
            textAlign="center"
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