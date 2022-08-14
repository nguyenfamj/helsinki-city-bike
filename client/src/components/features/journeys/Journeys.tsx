import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
  GridSortModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';

// Import form components
import InputDialog, { inputAttributes, formStates } from '../inputdialog/InputDialog';

// Theme styling tool
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Date format
import { format } from 'date-fns';

// Import API query
import {
  useGetJourneysQuery,
  getJourneysParams,
  useCreateJourneyMutation,
  createJourneyInput,
} from './journeysAPI';

// React Hooks
import { useState, useEffect, useCallback, ChangeEvent } from 'react';

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

const journeyInputs: inputAttributes[] = [
  {
    id: 'departure_time',
    name: 'departure_time',
    label: 'Departure time',
    type: 'time',
    variant: 'standard',
  },
  {
    id: 'departure_station_id',
    name: 'departure_station_id',
    label: 'Departure station id',
    type: 'number',
    variant: 'standard',
  },
  {
    id: 'departure_station_name',
    name: 'departure_station_name',
    label: 'Departure station name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'return_time',
    name: 'return_time',
    label: 'Return time',
    type: 'time',
    variant: 'standard',
  },
  {
    id: 'return_station_id',
    name: 'return_station_id',
    label: 'Return station id',
    type: 'number',
    variant: 'standard',
  },
  {
    id: 'return_station_name',
    name: 'return_station_name',
    label: 'Return station name',
    type: 'text',
    variant: 'standard',
  },
  {
    id: 'covered_distance',
    name: 'covered_distance',
    label: 'Covered distance',
    type: 'number',
    variant: 'standard',
  },
  {
    id: 'duration',
    name: 'duration',
    label: 'Duration',
    type: 'number',
    variant: 'standard',
  },
];

const Journeys = () => {
  // Query params state
  const [tableOptions, setTableOptions] = useState<getJourneysParams>({
    search: '',
    orderby: 'departure_time',
    size: 50,
    page: 1,
    sort: 'asc',
  });

  // Control form
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Query from server
  const { data, isFetching, isLoading, refetch } = useGetJourneysQuery(tableOptions);

  // Create journey mutation
  const [createJourney, result] = useCreateJourneyMutation();

  // Prepare data
  const rows: GridRowsProp = data?.journeys || [];
  const columns: GridColDef[] = [
    { headerName: '#', field: 'id', align: 'left', width: 70, sortable: false },
    {
      headerName: 'Departure time',
      field: 'departure_time',
      align: 'left',
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        format(new Date(params.value), 'Pp'),
      width: 140,
    },
    {
      headerName: 'Departure station id',
      field: 'departure_station_id',
      align: 'center',
      width: 130,
    },
    {
      headerName: 'Departure station',
      field: 'departure_station_name',
      align: 'left',
      width: 130,
    },
    {
      headerName: 'Return time',
      field: 'return_time',
      align: 'left',
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        format(new Date(params.value), 'Pp'),
      width: 140,
    },
    {
      headerName: 'Return station id',
      field: 'return_station_id',
      align: 'center',
      width: 110,
    },
    {
      headerName: 'Return station',
      field: 'return_station_name',
      align: 'left',
      width: 130,
    },
    {
      headerName: 'Covered distance',
      field: 'covered_distance',
      align: 'left',
      width: 120,
    },
    { headerName: 'Duration', field: 'duration', align: 'left', width: 120 },
  ];

  // Rows count state
  const [rowCountState, setRowCountState] = useState(data?.totalRowCount || 0);

  // Forms
  const initialCreateFormState: formStates = {
    open: isFormOpen,
    inputState: {
      departure_time: new Date(),
      return_time: new Date(),
      departure_station_id: 0,
      departure_station_name: '',
      return_station_id: 0,
      return_station_name: '',
      covered_distance: 0,
      duration: 0,
    },
    title: 'Journeys',
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
    setTableOptions({ ...tableOptions, search: event.target.value });
  };

  // handle sort change
  const handleSortChange = useCallback((sortModel: GridSortModel) => {
    setTableOptions((prevState) => ({
      ...prevState,
      orderby: String(sortModel[0].field),
      sort: String(sortModel[0].sort),
    }));
  }, []);

  // Handle form open
  const handleFormOpen: () => void = () => {
    setIsFormOpen(true);
  };

  // Handle form close
  const handleFormClose: () => void = () => {
    setIsFormOpen(false);
  };

  // handle form submit
  const handleFormSubmit: (inputData: createJourneyInput) => void = (inputData) => {
    const response = createJourney(inputData).unwrap();

    console.log(response);
    handleFormClose();
  };

  return (
    <>
      <InputDialog
        initialFormState={initialCreateFormState}
        inputs={journeyInputs}
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
              Journeys
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                sx={{ bgcolor: 'text.secondary', color: 'white', mr: '3rem' }}
                onClick={handleFormOpen}
              >
                Add journey
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
                onSortModelChange={handleSortChange}
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

export default Journeys;
