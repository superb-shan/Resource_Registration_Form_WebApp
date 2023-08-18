import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlWrapper from './FormControlWrapper';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';



 const Selector = ({ ...props }) => {

  const list = props.list;

  const handleChange = (event, newUser) => {
    props.setUser(newUser);
  };

  

  return (
      <ToggleButtonGroup
        color = "primary"
        value = {props.user}
        exclusive
        onChange = {handleChange}
      >
        {list.map((option) => < ToggleButton value={option.name} > {option.adornment}   <span className='ml-1'> {option.name} </span> </ToggleButton> )}
      </ToggleButtonGroup>
  );
}

const TextInput = ({...props}) => {

  const handleValueChange = (event) => props.setValue(event.target.value);

 if ("endAdornment" in props)
  return (
    <FormControlWrapper>
      <TextField id="outlined-basic" label={props.label} variant="outlined" 
        InputProps={{
            endAdornment: <InputAdornment position="end"> {props.endAdornment} </InputAdornment>
        }}
        value={props.value}
        onChange={handleValueChange}
      />
    </FormControlWrapper>
    );

  else 
    return (
      <FormControlWrapper>
        <TextField id="outlined-basic" label={props.label} variant="outlined" 
          value={props.value}
          onChange={handleValueChange}
        />
      </FormControlWrapper>
    );

}

const PasswordInput = ({...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleValueChange = (event) => props.setValue(event.target.value);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <FormControlWrapper>
      <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
        <OutlinedInput            
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
          <InputAdornment position="end">
            <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            >
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
          }
          label={props.label}
          value={props.value}
          onChange={handleValueChange}
        />
    </FormControlWrapper>
  );
}




export { Selector, TextInput, PasswordInput };