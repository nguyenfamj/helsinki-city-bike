import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components from MUI
import Box from '@mui/material/Box';

// Import features' UI
import { NavDrawer } from './features/navdrawer/NavDrawer';
import Journeys from '../components/features/journeys/Journeys';
import Stations from '../components/features/stations/Stations';
import SingleStation from '../components/features/singlestation/SingleStation';

function App() {
  return (
    <div>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <NavDrawer />
          <Routes>
            <Route path='/' element={<Navigate replace to='/journeys' />} />
            <Route path='/journeys/*' element={<Journeys />} />
            <Route path='/stations/*' element={<Stations />} />
            <Route path='/stations/:id/*' element={<SingleStation />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
