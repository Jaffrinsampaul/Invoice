import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import "../styles/css/currencyDialog.css" 
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { colors } from '../styles/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from '../styles/btnstyle/btnStyle';
import search from "../asset/search.svg"
import { useState } from 'react';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function CurrencyDialogBox() {
  const [selectedCurrency, setSelectedCurrency]=useState({})

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const names = [
    {
        contryName: "Japan",
        symbol: "¥",
    },
    {
        contryName: "Saudi Arabia",
        symbol: "﷼",
    },
    {
        contryName: "South Africa",
        symbol: "R",
    },
    {
        contryName: "Taiwan",
        symbol: "NT$",
    },{
        contryName: "United Kingdom",
        symbol: "£",
    },{
        contryName: "United States Dollar",
        symbol: "$",
    },{
        contryName: "India Rupee",
        symbol: "₹",
    },
];

  const handleChange =(e, countryName, symbol)=>{
    setSelectedCurrency({name: countryName, sym: symbol})
    setOpen(false)
  }

  return (
    <div 
      style={{display:"flex", 
          color: colors.lightGreen, 
          marginTop: "20px",
           marginLeft: "10px"
          }}>

      <p onClick={handleClickOpen} 
          style={{margin: 0, marginTop: "14px"}}>
        {selectedCurrency.name}
      </p>
      
      <select id="selectMenu" value={selectedCurrency.name} onClick={handleClickOpen}></select>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}
          >Select Currency <CloseIcon onClick={handleClose} style={styles.closeBtn}/></DialogTitle>
          <section id="seachbarDiv">
            
            <img src={search} alt="seach" style={{width:"20px"}}/>
            <input type="text" id='searchbar'/>
          </section>
          <DialogContent>
              {
                names.map((obj, index)=>{
                  return(
                    <MenuItem style={{
                      display: "flex",flexDirection: "row",
                      width: "400px",
                      value: obj.contryName
                    }} id ={index} onClick={(e)=>{handleChange(e, obj.contryName, obj.symbol)}}>
                      <section>
                        {obj.contryName}
                      </section>
                      <MenuItem style={{
                        position: "absolute",right: 0
                      }}>
                        {obj.symbol}
                        <NavigateNextIcon/>
                      </MenuItem>
                    </MenuItem>
                  )
                })
              }
            {/* </Select> */}
          </DialogContent>
        </Dialog>
    </div>
  );
}