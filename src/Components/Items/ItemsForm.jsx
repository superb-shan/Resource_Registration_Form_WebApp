
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ItemsContext } from '../../Context/Items.Context';
import { useContext } from 'react';
import { useState } from 'react';
import Checkbox from "@mui/material/Checkbox";
import TextArea from "@mui/material/TextareaAutosize";

function ItemsForm() {

  const{
    name, setName,
    EmpID, setEmpID,
    selectedDate, setSelectedDate,
    Designation, setDesignation,
    Department, setDepartment,
  
  }
  = useContext(ItemsContext)

        const [isChecked, setIsChecked] = useState(false);
        const [textValue, setTextValue] = useState("");

        const handleCheckboxChange = () => {
            setIsChecked(!isChecked);
        };

        const handleTextareaChange = (event) => {
            setTextValue(event.target.value);
        };


    // Event handler for UserName TextField
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      // Event handler for PhoneNumber TextField
      const handleEmpIDChange = (event) => {
        setEmpID(event.target.value);
      };

       // Event handler for Date Picker
      const handleDateChange = (date) => {
     setSelectedDate(date);
     };

       // Event handler for Designation TextField
  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  // Event handler for Department TextField
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };




  return (
    <div className='flex flex-wrap gap-8 justify-evenly items-center w-[800px] [@media(max-width:640px)]:w-[500px]'>
        
         {/* datepicker */}


         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
            label='Requisition Date *'
            sx={{width: "300px"}}
            views={['year', 'month', 'day']}
            disablePast
            value={selectedDate}
            onChange={handleDateChange}
            format='DD-MM-YYYY'
            />
          </DemoContainer>
        </LocalizationProvider> 

 {/* selecting user name */}

         <TextField
          id="outlined-select-username"
          label="Name *"
          value={name}
          onChange={handleNameChange}
          placeholder='Enter your Name'
          sx={{width: "300px"}}
        >
         
        </TextField>


        <TextField
          id="outlined-Emp-id-input"
          label="Emp ID *"
          type="text"
          value={EmpID}
          onChange={handleEmpIDChange}
          placeholder='Enter your Emp ID'
          sx={{width: "300px"}}
        />
      
{/* Designation*/}

        <TextField
          id="designation-input"
          label="Designation *"
          type="text"
          value={Designation}
          onChange={handleDesignationChange}
          placeholder='Enter  your Designation'
          sx={{width: "300px"}}
        />  

{/* Department*/}

        <TextField
          id="department-input"
          label="Department *"
          type="text"
          value={Department}
          onChange={handleDepartmentChange}
          placeholder='Enter Department'
          sx={{width: "300px"}}
        />  



        </div>
  );
}

export default ItemsForm;
