import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CurrencyDialogBox() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(personName)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{personName}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{}</em>
          </MenuItem>
          {names.map((name, index) => (
            <MenuItem
              key={index}
              value={name.symbol}
              style={getStyles(name, personName, theme)}
            >
              {name.contryName}  {name.symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}