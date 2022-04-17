import * as React from 'react';
import {styles} from"../styles/btnstyle/btnStyle"
import "../styles/css/calender.css"

import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomInput() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Custom input"
        value={value}
        
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box style ={styles.calender} sx={{ display: 'flex', alignItems: 'center' }}>
            <input ref={inputRef} {...inputProps} id="inputFields" />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}