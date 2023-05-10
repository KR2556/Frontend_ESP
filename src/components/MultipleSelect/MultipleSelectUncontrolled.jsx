import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function MultipleSelectUncontrolled({items = [],value = [], name,size,onChanged, width}) {
  
  const [checkProhibition, setCheckProhibition] = useState(value.map(x => x.id));

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    const result = typeof value === 'string' ? value.split(',') : value;

    if(onChanged) {
        onChanged(result);
    }

    setCheckProhibition(result);

  };

  return (
    <div>
      <FormControl sx={{ width: width}}>
        <Select
          size={size}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={checkProhibition}
          onChange={handleChange}
          name={name}
        >
          {items.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}