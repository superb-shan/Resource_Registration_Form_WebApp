import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlWrapper from '../Wrappers/FormControlWrapper';
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
import { Box, Chip, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



 const Selector = ({ ...props }) => {

  const handleChange = (event, newValue) => props.setValue(newValue);

  return (
      <ToggleButtonGroup
        color = "primary"
        value = {props.value}
        exclusive
        onChange = {handleChange}
      >
        {props.list.map((option) => < ToggleButton value={option.name} key={option.name} sx={{fontWeight: "bold"}} > {option?.adornment}  <span className='ml-1'> {option.name} </span> </ToggleButton> )}
      </ToggleButtonGroup>
  );
}


const TextInput = ({...props}) => {

  const endAdornment = props.endAdornment;

  const handleValueChange = (event) => props.setValue(event.target.value);

  return (
    <FormControlWrapper>
      <TextField 
        id={`outlined-basic-${props.label}`}
        variant="outlined" 
        {...props} 
        InputProps={{
          endAdornment: <InputAdornment position="end"> {endAdornment} </InputAdornment>
        }}
        value={props.value}
        onChange={handleValueChange}
      >
        {props.options?.map((option) => (
            <MenuItem key={option} value={option} disabled={props.disabledOptions?.includes(option)}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </FormControlWrapper>
  );

}

const DateTimeInput = ({...props}) => {

  const handleValueChange = (dateTime) => {
    props.setValue(dateTime);
    typeof props.unCheck === 'function' && props.unCheck(false);
  };

  return (
    <FormControlWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label = {props.label}
          disablePast 
          value={props.value} 
          onChange={handleValueChange} 
          format="DD MMM YYYY hh:mm A"
          viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        />
      </LocalizationProvider>
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
      <InputLabel htmlFor={`outlined-adornment-${props.label}`}>{props.label}</InputLabel>
        <OutlinedInput            
          id={`outlined-adornment-${props.label}`}
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

const ChipsInput = ({...props}) => {

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

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleValueChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const theme = useTheme();

  return (
    <FormControlWrapper>
      <InputLabel id={`${props.label}-multiple-chip-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${props.label}-multiple-chip-label`}
          id={`${props.label}-multiple-chip`}
          multiple
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleValueChange}
          input={<OutlinedInput id={`${props.label}-multiple-chip`} label={props.label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.options?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, props.value, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
    </FormControlWrapper>
  );

}

const DropDownSelector = ({...props}) => {

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(props.list.indexOf(props.value));

  useEffect(()=> {setSelectedIndex(props.list.indexOf(props.value))}, [props.value, selectedIndex, props.list]);

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





export { Selector, TextInput, DateTimeInput, PasswordInput, ChipsInput, DropDownSelector };