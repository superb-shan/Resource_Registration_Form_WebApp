
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ItemsContext } from '../../Context/Items.Context';
import { useContext } from 'react';
import { Typography } from '@mui/material';



function ItemsForm() {

  const{
    name, setName,
    EmpID, setEmpID,
    selectedDate, setSelectedDate,
    Designation, setDesignation,
    Department, setDepartment,
    printing,setPrinting,
    guestMomento,setGuestMomento,
    studentMomento,setStudentMomento,
    printedEnvelope,setprintedEnvelope,
    answerBooklet,setAnswerbooklet,
    studentNotebook,setStudentnotebook,
    studentNotebookWithGraph,setStudentnotebookwithgraph,
    studentNotebookWithoutGraph,setStudentnotebookwithoutgraph,
    observation,setObservation,
    purpose,setPurpose,
    withindays,setwithindays,
    Ondate,setofdate
  
  }
  = useContext(ItemsContext)


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

  const handlePurposeChange =(event)=>{
    setPurpose(event.target.value);
  }

  const handlePrintingChange = (event)=>{
    setPrinting(event.target.value);
  }

  const handleGuestMomentoChange = (event)=>{
    setGuestMomento(event.target.value);
  }

  const handlestudentMomentoChange = (event)=>{
    setStudentMomento(event.target.value);
  }

  const handleprintedEnvelopeChange = (event)=>{
    setprintedEnvelope(event.target.value);
  }

  const handleanswerBookletChange = (event)=>{
    setAnswerbooklet(event.target.value);
  }

  const handlestudentNotebookChange = (event)=>{
    setStudentnotebook(event.target.value)
  }

  const handlestudentNotebookWithoutGraphChange = (event)=>{
    setStudentnotebookwithoutgraph(event.target.value)
  }

  const handlestudentNotebookWithGraphChange =(event)=>{
    setStudentnotebookwithgraph(event.target.value)
  }

  const handleobservationChange = (event)=>{
    setObservation(event.target.value);
  }

  const handlewithindaysChange = (event)=>{
    setwithindays(event.target.value);
  }

  const handleOndateChange=(OnDate)=>{
    setofdate(OnDate);
  }




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


{/* purpose */}

      <TextField
          id="purpose-input"
          label="Purpose *"
          type="text"
          value={purpose}
          onChange={handlePurposeChange}
          placeholder='Enter the purpose  '
          sx={{width: "300px"}}
        />  


        <Typography sx={{mx: 4}}> Enter the Required Quantity for the required field alone below </Typography>



        {/* printing  */}

      <TextField
          id="printing-input"
          label="Printing the Materials "
          type="number"
          value={printing}
          onChange={handlePrintingChange}
          placeholder='Ledgers/Books/Certificates/Lab Manual/Newsletter '
          sx={{width: "300px"}}
        />  


        {/* guest momento  */}

      <TextField
          id="GUestMomento-input"
          label="Guest Momento "
          type="number"
          value={guestMomento}
          onChange={handleGuestMomentoChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  

        {/* student momento  */}

      <TextField
          id="studentMomento-input"
          label="Student Momento "
          type="number"
          value={studentMomento}
          onChange={handlestudentMomentoChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  


         {/* printed Envelopes */}

      <TextField
          id="Printed Envelopes-input"
          label="Printed Envelops "
          type="number"
          value={printedEnvelope}
          onChange={handleprintedEnvelopeChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  

            {/* Answer Booklets*/}

      <TextField
          id="AnswerBooklet-input"
          label="Answer Booklets "
          type="number"
          value={answerBooklet}
          onChange={handleanswerBookletChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  


              {/* Student Notebooks */}

      <TextField
          id="StudentNotebooks-input"
          label="Student Notebooks "
          type="number"
          value={studentNotebook}
          onChange={handlestudentNotebookChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  

               {/* Student record Notebooks without graph */}

      <TextField
          id="Student-RecordNotebooks-input"
          label="Student Record Notebooks(Without Graph) "
          type="number"
          value={studentNotebookWithoutGraph}
          onChange={handlestudentNotebookWithoutGraphChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  


            {/* Student record Notebooks with graph */}

      <TextField
          id="Student-RecordNotebooks-withGraph-input"
          label="Student Record Notebooks(With Graph) "
          type="number"
          value={studentNotebookWithGraph}
          onChange={handlestudentNotebookWithGraphChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  


          {/* Observations */}

      <TextField
          id="Student-Observation-input"
          label="Student Observation Books "
          type="number"
          value={observation}
          onChange={handleobservationChange}
          placeholder='Enter the required quantity '
          sx={{width: "300px"}}
        />  


        {/* Oclearance  */}

          <TextField
            id="days-input"
            label="Clearence of Bills/invoice within days * "
            type="number"
            value={withindays}
            onChange={handlewithindaysChange}
            placeholder='Enter No of Days '
            sx={{width: "300px"}}
          />  
  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
          label='Clearance of bill On or before Date *'
          sx={{width: "350px"}}
          views={['year', 'month', 'day']}
          disablePast
          value={Ondate}
          onChange={handleOndateChange}
          format='DD-MM-YYYY'
          />
        </DemoContainer>
      </LocalizationProvider> 

       








        </div>
  );
}

export default ItemsForm;
