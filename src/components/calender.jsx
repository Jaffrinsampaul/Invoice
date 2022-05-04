import * as React from 'react';

import { useDispatch } from 'react-redux';
import { saveInvoiceData } from './redux/reduxHandling';

import "../styles/css/calender.css"
import Arrow from "../asset/arrow.svg"
import {styles} from"../styles/btnstyle/btnStyle"

import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomInput(props) {

  const [value, setValue] = React.useState(new Date());
  const handleDateRedux = useDispatch()
  
  return (
    <LocalizationProvider style={{width:"100%"}}  dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Custom input"
        value={value}
        
        onChange={(newValue) => {
          setValue(newValue);
          let stringDate = newValue.toDateString()
          handleDateRedux(saveInvoiceData( props.dueDate, stringDate))
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box style ={styles.calender} sx={{ display: 'flex', justifyContent: "end"}}>
            <input ref={inputRef} {...inputProps} id="inputFields"/>

            <img src={Arrow} alt="arrow" 
              style={{width: "5%", height: "10%"}} onClick={InputProps}/>
              
              <section style ={{opacity:0, width: "0px", marginTop:"10px", position: "relative", right: "35px"}}>
                {InputProps?.endAdornment }
              </section>

          </Box>
        )}
      />
    </LocalizationProvider>
  );
}