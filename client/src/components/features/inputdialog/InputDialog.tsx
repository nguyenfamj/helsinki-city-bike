import { createJourneyInput } from '../journeys/journeysAPI';
import { createStationInput } from '../stations/stationsAPI';

import { useState, ChangeEvent, HTMLInputTypeAttribute } from 'react';

// Import from MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface InputDialogProps {
  initialFormState: formStates;
  inputs: inputAttributes[];
  handleSubmit: (inputData: any) => void;
  handleClose: () => void;
}

export interface formStates {
  open: boolean;
  type: string;
  title: string;
  inputState: any;
}
export interface inputAttributes {
  id: keyof createJourneyInput | keyof createStationInput;
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
}

const InputDialog = ({ initialFormState, inputs, handleSubmit, handleClose }: InputDialogProps) => {
  const [formStates, setFormStates] = useState<formStates>(initialFormState);

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    setFormStates({
      ...formStates,
      inputState: { ...formStates.inputState, [event.target.name]: event.target.value },
    });
  };
  const handleDatePicker: ({
    value,
    keyboardInputValue,
    input_id,
  }: {
    value: any;
    keyboardInputValue?: string | undefined;
    input_id: keyof createJourneyInput | keyof createStationInput;
  }) => void = ({ value, keyboardInputValue, input_id }) => {
    setFormStates({
      ...formStates,
      inputState: { ...formStates.inputState, [input_id]: value.toISOString() },
    });
  };

  console.log(formStates);

  return (
    <Dialog open={initialFormState.open} onClose={handleClose}>
      <DialogTitle>Create {formStates.title}</DialogTitle>
      <Box sx={{ width: '500px', height: '500px' }}>
        <DialogContent>
          {inputs.map((input) =>
            input.type === 'time' ? (
              <Box sx={{ my: '20px' }} key={input.id}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label={input.label}
                    value={formStates.inputState[input.id]}
                    onChange={(value: any, keyboardInputValue?: string | undefined) =>
                      handleDatePicker({ value, keyboardInputValue, input_id: input.id })
                    }
                    renderInput={(params) => (
                      <TextField id={input.id} name={input.name} label={input.label} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            ) : (
              <TextField
                key={input.id}
                autoFocus
                margin='dense'
                id={input.id}
                name={input.name}
                label={input.label}
                value={formStates.inputState[input.id]}
                type=''
                fullWidth
                variant={input.variant}
                onChange={handleChange}
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant='contained'
            onClick={() => {
              handleSubmit(formStates.inputState);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default InputDialog;
