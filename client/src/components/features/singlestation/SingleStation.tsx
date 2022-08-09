// React-router-dom
import { useParams } from 'react-router-dom';

// UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Theme styling tool
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import from API RTK query
import { useGetSingleStationQuery } from './singleStationAPI';

// Theme
const pageTheme = createTheme({
  palette: {
    primary: { main: '#efefef' },

    text: {
      primary: '#212121',
      secondary: '#3d5cb0',
    },
  },
});

const SingleStation = () => {
  const { id: station_id } = useParams();
  const { data, isFetching, isLoading } = useGetSingleStationQuery({ station_id });
  const stationData = data?.stationData[0];
  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <ThemeProvider theme={pageTheme}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: '30px',
              px: '50px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: '2rem', color: 'text.secondary' }}>
                Station: {stationData?.fi_name}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '1.2rem', color: 'text.primary' }}>
                {stationData?.fi_address} {stationData?.fi_city} | {stationData?.se_address}
                {stationData?.se_city}
              </Typography>
              <Box sx={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Journeys from station
                  </Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '2rem', color: 'text.secondary' }}>
                    {data?.journeysFromStation}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Journeys to station
                  </Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '2rem', color: 'text.secondary' }}>
                    {data?.journeysToStation}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', mt: '10px' }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Average distance of journeys from the station
                  </Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '2rem', color: 'text.secondary' }}>
                    {data?.avgDistanceFromStation.toFixed(2)} m
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Average distance of journeys to the station
                  </Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '2rem', color: 'text.secondary' }}>
                    {data?.avgDistanceToStation.toFixed(2)} m
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', mt: '10px' }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Top 5 return stations from {stationData?.fi_name}
                  </Typography>
                  {data?.topPlacesFromStation.map((station) => (
                    <Box
                      key={station.return_station_id}
                      sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, fontSize: '1.2rem', color: 'text.secondary' }}
                      >
                        {station.return_station_name}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: '1.2rem', color: 'text.primary' }}
                      >
                        {station.counted}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', mt: '30px' }}
                  >
                    Top 5 departure stations to {stationData?.fi_name}
                  </Typography>
                  {data?.topPlacesToStation.map((station) => (
                    <Box
                      key={station.departure_station_id}
                      sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, fontSize: '1.2rem', color: 'text.secondary' }}
                      >
                        {station.departure_station_name}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: '1.2rem', color: 'text.primary' }}
                      >
                        {station.counted}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ mt: '40px' }}>
                <iframe
                  title='stationMap'
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCIC_DTl58So-HHgLxlwOx6FgBmfEhknKk&q=${stationData?.latitude},${stationData?.longitude}`}
                  width='450'
                  height='250'
                ></iframe>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default SingleStation;
