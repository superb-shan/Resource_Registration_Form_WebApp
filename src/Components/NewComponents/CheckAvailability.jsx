import React, { useContext, useState } from 'react'
import { DateTimeInput, Selector } from './InteractionFields';
import { Box, Button, Divider, Grid, List, ListItemText, Typography } from '@mui/material';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { SeminorContext } from '../../Context/Seminor.Context';
import { UserContext } from '../../Context/User.Context';
import { GuestHouseContext } from '../../Context/GuestHouse.Context';


const CheckAvailability = ({...props}) => {


  const target = props.target
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [formType, setFormType] = useState('Seminar Hall');

  let {
        isAvailabilityChecked, 
        setIsAvailabilityChecked,
        unavailableHalls, 
        setUnavailableHalls,
        allHalls 
      } = useContext(SeminorContext);

  const{
        setSelectedView,
        setSelectedForm
    } = useContext(UserContext);

  const {
    isGuestHouseAvailabilityChecked,
    setIsGuestHouseAvailabilityChecked,
    unavailableGuestHouses,
    setUnavailableGuestHouses,
    allRooms
  } = useContext(GuestHouseContext);


  const {startDateTime, setStartDateTime,
      endDateTime, setEndDateTime} = useContext(formType  === "Seminar Hall" || target === "seminar" ? SeminorContext :GuestHouseContext);

  if(formType  === "Guest House" || target === "guesthouse"){
    isAvailabilityChecked  =  isGuestHouseAvailabilityChecked;
    setIsAvailabilityChecked  =  setIsGuestHouseAvailabilityChecked;
    unavailableHalls  =  unavailableGuestHouses;
    setUnavailableHalls =  setUnavailableGuestHouses;
    allHalls = allRooms;
  }
  
  const isWithinNextTwoMonths = (givenDate) => {
    if (!givenDate) {
      return false;
    }

    //moment() -> gives current DateTime
    const twoMonthsFromNow = moment().add(2, 'months');

    return moment(givenDate.toString()).isBefore(twoMonthsFromNow.toString(), 'day'); // returns true or false
  };
  
  const handleCheckAvailability = async () => {
    if (!startDateTime || !endDateTime){
      toast.warn("Please select a start and end time");
      return;
    }
    if (!moment(startDateTime.toString()).isSameOrBefore(endDateTime.toString())){
      toast.error('Start date & time should be same or before End date & Time');
      return;
    }
    // if(moment(endDate).isSame(moment(startDate)) && moment(endTime).isSameOrBefore(moment(startTime), 'hour')){
    //   toast.error("Start Time Should Be Before End Time with at least 1 hour slot");
    //   return;
    // }

    // const startDateTime = moment(`${startDate} ${startTime}`, 'DD-MM-YYYY HH:mm A');
    // const endDateTime = moment(`${endDate} ${endTime}`, 'DD-MM-YYYY HH:mm A');
    // if(moment(endDate).isSame(moment(startDate)) && moment(endDateTime).isSameOrBefore(moment(startDateTime), 'hour')){
    //   toast.error("Start Time Should Be Before End Time with at least 1 hour slot");
    //   return;
    // }

    // console.log("s:", startDateTime, "e:", endDateTime);
    // if (endDateTime.isBefore(startDateTime)) {
    //   console.log("s:", startDateTime, "e:", endDateTime);
    //   toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
    //   return;
    // }
    if(!moment(endDateTime.toString()).isAfter(moment(startDateTime.toString()), 'hour')){
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }
    if (!isWithinNextTwoMonths(startDateTime) || !isWithinNextTwoMonths(endDateTime)){
      toast.info('You can only book Halls within next months');
      return;
    }

    setIsAvailabilityLoading(true);
    //console.log(`/${target ? target : formType === "Seminar Hall"? "seminar": "guesthouse"}/checkAvailability`);
    const res = await axios.get((target === "seminar" || formType === "Seminar Hall" ? "/seminar/checkAvailability": "/guesthouse/checkAvailablity") + "", {params: formType  === "Seminar Hall" || target === "seminar" ? {startDate: moment(startDateTime.toString()).format("YYYY-MM-DD"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD"), startTime: moment(startDateTime.toString()).format("HH:mm:ss"), endTime: moment(endDateTime.toString()).format("HH:mm:ss")}: {DepartureDateTime : moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), ArrivialDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")}});
    console.log(res);
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
  }

  const handleProceed = () => {
    setSelectedView("Add Bookings");
    setSelectedForm(formType);
  }

  return (
    <>
      {!target &&
        <Box marginX={"100px"}>
          <Selector
              list={[
                { name: "Seminar Hall" },
                { name: "Guest House"},
              ]}
              value={formType}
              setValue={setFormType}
          />
        </Box>
      }
      <DateTimeInput label="Start Date & Time *" value={startDateTime} setValue={setStartDateTime} unCheck={setIsAvailabilityChecked} />
      <DateTimeInput label="End Date & Time *" value={endDateTime} setValue={setEndDateTime} unCheck={setIsAvailabilityChecked} />

      <Button variant="contained" sx={{width:"300px", height: "40px", mb: '1rem', mx: {xs: 0, md: "200px"}}} onClick={handleCheckAvailability} color={ isAvailabilityChecked? "success" : "primary"} >{isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done/> : <>Check Availability</>  }</Button>

      { isAvailabilityChecked && 
      <Grid container spacing={2} sx={{textAlign: "center", backgroundColor: "secondary.main",  width: {xs:"400px", md:"720px"}, borderRadius: "10px", ml: {xs:0,md:1}, maxHeight: {md: "365px"}, overflow: "auto"}}>
        <Grid item xs={12} md={6} >
          <Typography variant="h6" component="div" >
            Available
          </Typography>
          <Box>
            <List>
              {
                isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} />  :
               (unavailableHalls.length === allHalls.length ? <ListItemText primary={"None"} />  : allHalls.filter(hall => !unavailableHalls.includes(hall)).map((hall) => <ListItemText primary={hall} />))
              }
            </List>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={5}>
          <Typography variant="h6" component="div">
            Not Available
          </Typography>
          <Box>
            <List>
              {unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : unavailableHalls.map((hall) => <ListItemText primary={hall}/>)}  
            </List>
          </Box>
        </Grid>
      </Grid>
      }

      {!target &&
        <Box marginX={"100px"}>
          <Button variant="contained" sx={{width:"200px", height: "40px", mx: "auto"}} onClick={handleProceed} disabled={!isAvailabilityChecked} endIcon={<Send />}>Proceed</Button>
        </Box>
      }
    </>
  )
}

export default CheckAvailability;