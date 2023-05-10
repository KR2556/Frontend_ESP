import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label = "No label",name,value,onValueChanged,minWidth,maxWidth,width,items,setFieldValue,defaultValue,required}) {

  const handleChange = (event) => {
    
    const {
      target: { value },
    } = event; 

    if(onValueChanged) onValueChanged(setFieldValue,name,value);

    setFieldValue(name,value);

  };

  return (
    <Box sx={{ minWidth:minWidth, maxWidth:maxWidth}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          required={required}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value={""}>{defaultValue}</MenuItem>
          {
            items.map(item => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))
          }
        </Select>
      </FormControl>
    </Box>
  );
}