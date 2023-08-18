import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlWrapper from './FormControlWrapper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';



 const Selector = ({ ...props }) => {

  const list = props.list;

  const handleChange = (event, newValue) => props.setValue(newValue);

  return (
      <ToggleButtonGroup
        color = "primary"
        value = {props.value}
        exclusive
        onChange = {handleChange}
      >
        {list.map((option) => < ToggleButton value={option.name} key={option.name} sx={{fontWeight: "bold"}} > {option?.adornment}  <span className='ml-1'> {option.name} </span> </ToggleButton> )}
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

const DropDownSelector = ({...props}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(props.list.indexOf(props.value));

  useEffect(()=> {setSelectedIndex(props.list.indexOf(props.value))}, [props.value, selectedIndex]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    props.setValue(props.list[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{backgroundColor: "white"}}
          
        >
          <ArrowDropDownIcon />
        </Button>
        <Button onClick={null} style={{backgroundColor: "white", fontWeight: "bold"}}  >{props.list[selectedIndex]}</Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {props.list.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}





export { Selector, TextInput, PasswordInput, DropDownSelector };