import { DataGrid, GridRowsProp, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';

// Import form components
import InputDialog, { formStates, inputAttributes } from '../inputdialog/InputDialog';

// Theme styling tool
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import API query
import {
  useGetStationsQuery,
  getStationsParams,
  useCreateStationMutation,
  createStationInput,
} from './stationsAPI';
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

const stationInputs: inputAttributes[] = [
  {
    id: 'station_id',
    name: 'station_id',
    label: 'Station id',
    type: 'number',
    variant: 'standard',
  },
  {
    id: 'fi_name',
    name: 'fi_name',
    label: 'Finnish name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'se_name',
    name: 'se_name',
    label: 'Swedish name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'en_name',
    name: 'en_name',
    label: 'English name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'fi_address',
    name: 'fi_address',
    label: 'Finnish address',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'se_address',
    name: 'se_address',
    label: 'Swedish address',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'fi_city',
    name: 'fi_city',
    label: 'Finnish city',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'se_city',
    name: 'se_city',
    label: 'Swedish city',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'operator_name',
    name: 'operator_name',
    label: 'Operator name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'capacity',
    name: 'capacity',
    label: 'Capacity',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'longitude',
    name: 'longitude',
    label: 'Longitude',
    type: 'number',
    variant: 'standard',
  },
  {
    id: 'latitude',
    name: 'latitude',
    label: 'Latitude',
    type: 'number',
    variant: 'standard',
  },
];

const Stations = () => {
  // Query params state
  const [tableOptions, setTableOptions] = useState<getStationsParams>({
    search: '',
    size: 50,
    page: 1,
  });

  // Control form
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Query from server
  const { data, isFetching, isLoading, refetch } = useGetStationsQuery(tableOptions);

  // Create station mutation
  const [createStation, result] = useCreateStationMutation();

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

  // Forms
  const initialCreateFormState: formStates = {
    open: isFormOpen,
    inputState: {
      station_id: 0,
      fi_name: '',
      se_name: '',
      en_name: '',
      fi_address: '',
      se_address: '',
      fi_city: '',
      se_city: '',
      operator_name: '',
      capacity: 0,
      longitude: '',
      latitude: '',
    },
    title: 'Stations',
    type: 'create',
  };

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

  // Handle form open
  const handleFormOpen: () => void = () => {
    setIsFormOpen(true);
  };

  // Handle form close
  const handleFormClose: () => void = () => {
    setIsFormOpen(false);
  };

  // handle form submit
  const handleFormSubmit: (inputData: createStationInput) => void = (inputData) => {
    const response = createStation(inputData).unwrap();

    console.log(response);
    handleFormClose();
  };

  return (
    <>
      <InputDialog
        initialFormState={initialCreateFormState}
        inputs={stationInputs}
        handleClose={handleFormClose}
        handleSubmit={handleFormSubmit}
      />
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
                onClick={handleFormOpen}
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
