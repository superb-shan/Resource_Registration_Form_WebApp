import React, { useState, useContext } from 'react'
import FormContainer from '../Containers/FormContainer'
import { DateTimeInput, TextInput } from '../Fields/InteractionFields';
import { LoginContext } from '../../Context/Login.Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { UserContext } from '../../Context/User.Context';
import { Button, Typography } from '@mui/material';
import { Done, Send } from '@mui/icons-material';
import { DataContext } from '../../Context/Data.Context';
import Checkbox from '@mui/material/Checkbox';


const FoodForm = () => {

    const [coordinatorName, setCoordinatorName] = useState('');
    const [requestorEmpId, setRequestorEmpID] = useState('');
    const [department, setDepartment] = useState('');
    const [Events, setEvents] = useState('');
    const [Menu,setMenus]=useState('');
    const [nameOfRequisition, setNameOfRequisition] = useState('');
    const [requisitionDateTime, setRequisitionDateTime] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const [checkedBF, setCheckedBF] = useState(false);
    const [checkedL, setCheckedL] = useState(false);
    const [checkedD, setCheckedD] = useState(false);
    const [checkedMr, setCheckedMr] = useState(false);
    const [checkedEr, setCheckedEr] = useState(false);
    const [person,setPerson]=useState(0);
    const [BreakfastVeg,setBreakfastVeg]=useState(0);
    const [BreakfastNonVeg,setBreakfastNonVeg]=useState(0);
    const [LunchVeg,setLunchVeg]=useState(0);
    const [LunchNonVeg,setLunchNonVeg]=useState(0);
    const [DinnerVeg,setDinnerVeg]=useState(0);
    const [DinnerNonVeg,setDinnerNonVeg]=useState(0);
    const [MorningRefreshment,setMorningRefreshment]=useState("Not Required");
    const [EveningRefreshment, setEveningRefreshment] = useState("Not Required");

    const [postStatus, setPostStatus] = useState(false);
    const {userName} = useContext(LoginContext);
    const { allDepartments } = useContext(DataContext);
    const {setSelectedView} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const AllMenu = ['participants Menu','Guest Menu','Special Menu','VIP Menu']
    const AllEvents =['Guest Lecture','Workshop','FDP','Visiting Faculty','Conference','Value Added Course','Training','Orientation','Project Expo','Outreach','Others']

    function isNotEmpty(value) {
        if (value === null || value === undefined) {
            return false;
        }
        
        if (typeof value === "string" || Array.isArray(value)) {
            return value.trim() !== "";
        }
        
        if (typeof value === "object" && value instanceof Date) {
            return !isNaN(value.getTime());
        }
        
        return true;
    }

   

    function areAllFieldsNotEmpty(fields) {
        for (const field of fields) {
          if (!isNotEmpty(field)) {
            return false;
          }
        }
        return true;
    }

    const fieldsToCheckForValidation = [
         coordinatorName,
         requestorEmpId,
         department,
         Events,
         Menu,
         nameOfRequisition,
         startDateTime,
         endDateTime,
         person,
         requisitionDateTime
         
      ];

    const handleBreakfast = () => {
        setCheckedBF(!checkedBF);
      };

    const handleLunch = () => {
        setCheckedL(!checkedL);
    }

    const handleDinner = () => {
        setCheckedD(!checkedD);
    }

    const handleMr =() => {
        setCheckedMr(!checkedMr);
       {!checkedMr && setMorningRefreshment("required")}
       {checkedMr && setMorningRefreshment("Not Required")}
    }

    const handleEr = () =>{
        setCheckedEr(!checkedEr); 
        {!checkedEr && setEveningRefreshment("required")}
        {checkedEr&& setEveningRefreshment("Not Required")}   
    }

    const handleSubmit = async() => {


        setIsLoading(true);
        const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
        if (!allFieldsNotEmpty){
            toast.warning('Fill all the Required fields');
            setIsLoading(false);
            return;
        }
        if(coordinatorName.length <3 || coordinatorName.length>=50 ){
            toast.error("Name should be greater than three characters")
            setIsLoading(false);
            return;
        }
        console.log("came")
        if(person === 0)
        {
          console.log("came inside")
          toast.error("No of Person can't be ZERO ");
          setIsLoading(false);
          return;
        }
        console.log("came inside11")
        if(
          BreakfastVeg === 0 &&
          BreakfastNonVeg === 0 &&
          LunchVeg === 0 &&
          LunchNonVeg ===  0 &&
          DinnerVeg === 0 &&
          DinnerNonVeg === 0 &&
          MorningRefreshment === "Not Required" &&
          EveningRefreshment === "Not Required" 
        ){
          console.log("came inside33")
          toast.error("Atleast one meal or refreshment is required");
          setIsLoading(false);
          return;
        }
        // if(requisitionDateTime.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")){
        //     toast.error("cannot book item for today");
        //     return;
        // }

        const formattedDateTime = requisitionDateTime.toString();
        const formattedDateTime1 = startDateTime.toString();
        const formattedDateTime2 = endDateTime.toString();
        const res = await axios.post(`/Food/create`, 
        {
            userName,
            coordinatorEmpId :requestorEmpId,
            coordinatorName,
            department,
            nameOfEvent :nameOfRequisition,
            typeOfEvent :Events,
            coordinatorPhoneNumber :"8907654321",
            requisitionDateTime :formattedDateTime,
            startDateTime :formattedDateTime1,
            endDateTime :formattedDateTime2,
            Menu,
            person,
            BreakfastVeg,
            BreakfastNonVeg,
            LunchVeg,
            LunchNonVeg,
            DinnerVeg,
            DinnerNonVeg,
            MorningRefreshment,
            EveningRefreshment,
        }
        );
        setPostStatus(res.data.message);
        if(res.data.message===true){
            toast.success("Submitted");
        }else{
            toast.error("Please fill the form correctly");
            return;
        }
        setSelectedView('My Bookings');
        setIsLoading(false);
    };

    


  return (
    <FormContainer title="Food/Refreshment Requisition Form">
        <TextInput label="Requestor Name *" value={coordinatorName} setValue={setCoordinatorName} />
        <TextInput label="Requestor EMP ID *" value={requestorEmpId} setValue={setRequestorEmpID} />
        <TextInput label="Department *" select={true} value={department} setValue={setDepartment} options={allDepartments} />
        <TextInput label="Name of the Event *"  value={nameOfRequisition} setValue={setNameOfRequisition}  />
        <TextInput label="Type of the Event *" select={true} value={Events} setValue={setEvents} options={AllEvents} />
        <DateTimeInput label="Requisition Date Time *" value={requisitionDateTime} setValue={setRequisitionDateTime} />
        <TextInput label="Menu Required *" select={true} value={Menu} setValue={setMenus} options={AllMenu} />
        <TextInput label="No of persons *" value={person} setValue={setPerson} />
        <DateTimeInput label="Start Date & Time *" value={startDateTime} setValue={setStartDateTime}  />
        <DateTimeInput label="End Date & Time *" value={endDateTime} setValue={setEndDateTime}  />
        <Typography sx={{marginTop:"10px"}}>Select the required field and enter the correct quantity</Typography>
        
        <div className='flex gap-[50px]'>
           <div className='flex'>
            <Checkbox checked={checkedBF} sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} onChange={handleBreakfast} inputProps={{ 'aria-label': 'controlled' }} />
            <Typography sx={{marginTop:"50px"}}>Breakfast</Typography>
           </div>
           <div className='flex flex-col gap-[10px]'>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px",marginLeft:"40px"}}>VEG :  </Typography> 
              <TextInput id="filled-required" label="Count " value={BreakfastVeg} setValue={setBreakfastVeg} disabled={!checkedBF} />
             </div>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px"}}>NON VEG :  </Typography> 
              <TextInput label="Count " value={BreakfastNonVeg} setValue={setBreakfastNonVeg} disabled={!checkedBF}/>
             </div>
           </div>
        </div>

        <div className='flex gap-[50px] '>
           <div className='flex'>
            <Checkbox checked={checkedL} sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} onChange={handleLunch} inputProps={{ 'aria-label': 'controlled' }} />
            <Typography sx={{marginTop:"50px",marginRight:'25px'}}>Lunch</Typography>
           </div>
           <div className='flex flex-col gap-[10px]'>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px",marginLeft:"40px"}}>VEG :  </Typography> 
              <TextInput id="filled-required" label="Count " value={LunchVeg} setValue={setLunchVeg} disabled={!checkedL} />
             </div>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px"}}>NON VEG :  </Typography> 
              <TextInput label="Count " value={LunchNonVeg} setValue={setLunchNonVeg} disabled={!checkedL}/>
             </div>
           </div>
        </div>

        <div className='flex gap-[50px]'>
           <div className='flex'>
            <Checkbox checked={checkedD} sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} onChange={handleDinner} inputProps={{ 'aria-label': 'controlled' }} />
            <Typography sx={{marginTop:"50px",marginRight:'25px'}}>Dinner</Typography>
           </div>
           <div className='flex flex-col gap-[10px]'>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px",marginLeft:"40px"}}>VEG :  </Typography> 
              <TextInput id="filled-required" label="Count " value={DinnerVeg} setValue={setDinnerVeg} disabled={!checkedD} />
             </div>
             <div className='flex gap-[10px]'>
              <Typography sx={{marginTop:"15px"}}>NON VEG :  </Typography> 
              <TextInput label="Count " value={DinnerNonVeg} setValue={setDinnerNonVeg} disabled={!checkedD}/>
             </div>
           </div>
        </div>

          <div className='flex ml-[13px]'>
            <Checkbox checked={checkedMr} sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} onChange={handleMr} inputProps={{ 'aria-label': 'controlled' }} />
            <Typography sx={{marginTop:"15px"}}>Morning Refreshment</Typography>
           </div>

           <div className='flex pr-[13px]'>
            <Checkbox checked={checkedEr} sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} onChange={handleEr} inputProps={{ 'aria-label': 'controlled' }} />
            <Typography sx={{marginTop:"15px"}}>Evening Refreshment</Typography>
           </div>

        

        <Button variant="contained" disabled={isLoading} onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<Done />:<Send />}>{isLoading? <ReactLoading type="spin" width={25} height={25}/> : postStatus?"Submitted":"Submit"}</Button>
    
    </FormContainer>
  )
}

export default FoodForm;