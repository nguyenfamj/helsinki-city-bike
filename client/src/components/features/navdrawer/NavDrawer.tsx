import Drawer from '@mui/material/Drawer';
import CssBaseLine from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Theme styling tool
import { ThemeProvider, createTheme } from '@mui/material/styles';

// CSS
import './navdrawer.css';

// Routing
import { Link } from 'react-router-dom';

// Theme
const drawerTheme = createTheme({
  palette: {
    primary: { main: '#efefef' },

    text: {
      primary: '#000000',
      secondary: '#535353',
    },
  },
});

// Interface
interface navigation {
  id: number;
  name: string;
  href: string;
}

export const NavDrawer = () => {
  const DRAWER_WIDTH = 250;

  const navigations: navigation[] = [
    { id: 1, name: 'Journeys', href: '/journeys' },
    { id: 2, name: 'Stations', href: '/stations' },
  ];

  return (
    <div>
      <ThemeProvider theme={drawerTheme}>
        <CssBaseLine />
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundColor: 'primary.main',
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              boxShadow: 1,
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar sx={{ p: '20px', mt: '20px', display: 'flex' }}>
            <Box sx={{ width: 64, height: 64 }}>
              <Link to='/'>
                <img
                  src={process.env.PUBLIC_URL + '/assets/logo/logo.png'}
                  className='logo'
                  alt=''
                />
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '25px' }}>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: 'text.primary' }}>
                  HELSINKI
                </Typography>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 500, color: 'text.secondary' }}>
                  BIKE
                </Typography>
              </Link>
            </Box>
          </Toolbar>
          <Box sx={{ width: '100%', height: '100%', padding: '20px' }}>
            <List>
              {navigations.map((nav) => (
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  key={nav.id}
                  to={nav.href}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Typography
                          sx={{ fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}
                        >
                          {nav.name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </ThemeProvider>
    </div>
  );
};
