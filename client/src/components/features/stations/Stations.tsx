import { DataGrid, GridRowsProp, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';

// Theme styling tool
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import API query
import { useGetStationsQuery, getStationsParams } from './stationsAPI';
import { useNavigate } from 'react-router-dom';

// React Hooks
import { useState, useEffect, ChangeEvent } from 'react';

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

const Stations = () => {
  // Query params state
  const [tableOptions, setTableOptions] = useState<getStationsParams>({
    search: '',
    size: 50,
    page: 1,
  });

  // Query from server
  const { data, isFetching, isLoading, error, refetch } = useGetStationsQuery(tableOptions);

  // Navigate
  const navigate = useNavigate();

  // Prepare data
  const rows: GridRowsProp = data?.stations || [];
  const columns: GridColDef[] = [
    { headerName: 'Station id', field: 'station_id', align: 'left', width: 70, sortable: false },
    {
      headerName: 'Finnish name',
      field: 'fi_name',
      align: 'left',
      width: 140,
    },
    {
      headerName: 'Swedish name',
      field: 'se_name',
      align: 'left',
      width: 130,
    },
    {
      headerName: 'English name',
      field: 'en_name',
      align: 'left',
      width: 130,
    },
    {
      headerName: 'Finnish address',
      field: 'fi_address',
      align: 'left',
      width: 140,
    },
    {
      headerName: 'Swedish address',
      field: 'se_address',
      align: 'left',
      width: 110,
    },
    {
      headerName: 'Operator name',
      field: 'operator_name',
      align: 'left',
      width: 130,
    },
    {
      headerName: 'Capacity',
      field: 'capacity',
      align: 'left',
      width: 120,
    },
  ];

  // Rows count state
  const [rowCountState, setRowCountState] = useState(data?.totalRowCount || 0);

  // useEffect
  useEffect(() => {
    refetch(); // When disable this, the server side sorting is possible
    // Set row count
    setRowCountState((prevRowCountState) =>
      data?.totalRowCount !== undefined ? data?.totalRowCount : prevRowCountState
    );
  }, [data?.totalRowCount, tableOptions, refetch]);

  // On search change
  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTableOptions({ ...tableOptions, search: event.target.value, page: 1 });
  };

  // On row click
  const onRowClick = (params: GridRowParams) => {
    navigate(`/stations/${params.row.station_id}`);
  };

  return (
    <>
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
              Bike Stations
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                sx={{ bgcolor: 'text.secondary', color: 'white', mr: '3rem' }}
              >
                Add station
              </Button>
              <TextField
                placeholder='Search by station'
                variant='standard'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                name='search'
                value={tableOptions.search}
                onChange={onInputChange}
              />
            </Box>
          </Box>
          {/* Data Grid */}
          <Box
            sx={{
              width: '100%',
              height: '90%',
            }}
          >
            {!isFetching && rows ? (
              <DataGrid
                sx={{
                  '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                  '&.MuiDataGrid-root': {
                    border: 'none',
                  },
                  '.MuiDataGrid-columnHeaderTitle': { fontWeight: 800 },
                }}
                rows={rows}
                getRowId={(row) => row.station_id}
                columns={columns}
                pagination
                loading={isLoading}
                paginationMode='server'
                sortingMode='server'
                rowCount={Number(rowCountState)}
                page={Number(tableOptions.page)}
                pageSize={Number(tableOptions.size)}
                onPageChange={(newPage) =>
                  setTableOptions((prevState) => ({ ...prevState, page: newPage }))
                }
                onPageSizeChange={(newPageSize) =>
                  setTableOptions((prevState) => ({ ...prevState, size: newPageSize }))
                }
                onRowClick={onRowClick}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Stations;
