import React, { useContext, useState } from 'react'
import { DateTimeInput, Selector } from '../Fields/InteractionFields';
import { Box, Button, Divider, Grid, List, ListItemText, Typography } from '@mui/material';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { SeminarContext } from '../../Context/Seminar.Context';
import { UserContext } from '../../Context/User.Context';
import { GuestHouseContext } from '../../Context/GuestHouse.Context';
import CustomCollapsible from '../DataShow/CustomCollapsible';
import { DataContext } from '../../Context/Data.Context';


const CheckAvailability = ({...props}) => {

  const { terms } = useContext(DataContext);
  const target = props.target
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [unavailableHallsObject, setUnavailableHallsObject] = useState([]);
  const [formType, setFormType] = useState('Seminar Hall');

  let {
        isAvailabilityChecked, 
        setIsAvailabilityChecked,
        unavailableHalls, 
        setUnavailableHalls,
        allHalls 
      } = useContext(SeminarContext);

  allHalls = allHalls.map(hall => hall.name);

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


  const {
    startDateTime,
    setStartDateTime,
    endDateTime, 
    setEndDateTime
  } = useContext(target === "guesthouse" || formType === "Guest House" ? GuestHouseContext : SeminarContext);

  if(formType  === "Guest House" || target === "guesthouse"){
    isAvailabilityChecked  =  isGuestHouseAvailabilityChecked;
    setIsAvailabilityChecked  =  setIsGuestHouseAvailabilityChecked;
    unavailableHalls  =  unavailableGuestHouses;
    setUnavailableHalls =  setUnavailableGuestHouses;
    allHalls = allRooms;
  }
  
  const isWithinNextTwoMonths = (givenDate) => {
    if (!givenDate) {
      return;
    }
    //moment() -> gives current DateTime
    const twoMonthsFromNow = moment().add(2, 'months');

    return moment(givenDate.toString()).isBefore(twoMonthsFromNow.toString(), 'day'); // returns true or false
  };
  
  const handleCheckAvailability = async () => {
    console.log(formType, target);
    if (!startDateTime || !endDateTime){
      toast.warn("Please select a start and end time");
      return;
    }
    if (!moment(startDateTime.toString()).isSameOrBefore(endDateTime.toString())){
      toast.error('Start date & time should be same or before End date & Time');
      return;
    }

    if(!moment(endDateTime.toString()).isAfter(moment(startDateTime.toString()), 'hour')){
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }
    if (!isWithinNextTwoMonths(startDateTime) || !isWithinNextTwoMonths(endDateTime)){
      toast.info('You can only book Halls within next months');
      return;
    }

    setIsAvailabilityLoading(true);
    console.log("target", target, "formType" , formType);
    console.log(terms);
    //console.log({params: formType  === "Seminar Hall" || target === "seminar" ? {startDate: moment(startDateTime.toString()).format("YYYY-MM-DD"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD"), startTime: moment(startDateTime.toString()).format("HH:mm:ss"), endTime: moment(endDateTime.toString()).format("HH:mm:ss")}: {DepartureDateTime : moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), ArrivialDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")}})
    //console.log(`/${target ? target : formType === "Seminar Hall"? "seminar": "guesthouse"}/checkAvailability`);
    const res = await axios.get((target === "guesthouse" || formType === "Guest House" ? "/guesthouse/checkAvailability": "/seminar/checkAvailability") + "", {params: {startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), endDateTime: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")}});
    console.log("result", res);
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    console.log(target === "guesthouse", res.data?.overlappingGuestHouses?.map(gh => gh.roomRequired))
    // console.log(res.data?.overlappingSeminarHalls?.map(seminar => seminar.hallRequired));
    setUnavailableHalls(target === "guesthouse" || formType === "Guest House" ? res.data?.overlappingGuestHouses?.map(gh => gh.roomRequired) : res.data?.overlappingSeminarHalls?.map(seminar => seminar.hallRequired));
    setUnavailableHallsObject(target === "guesthouse" || formType === "Guest House" ? res.data?.overlappingGuestHouses : res.data?.overlappingSeminarHalls);
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
               (unavailableHalls.length === allHalls.length ? <ListItemText primary={"None"} />  : allHalls.filter(hall => !unavailableHalls.includes(hall)).map((hall) => <ListItemText key={hall} primary={hall} />))
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
            {console.log("unavailableHallsObject",unavailableHallsObject, "unavailableHalls", unavailableHalls)}
            <List sx={{width: "320px"}}>
              {
                unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : 
                unavailableHallsObject.map((hall) => 
                  <CustomCollapsible title={target === "guesthouse" || formType === "Guest House" ? hall.roomRequired : hall.hallRequired} >
                    <Box sx={{textAlign: "left"}}>
                      {Object.keys(hall).filter((item) => item !== "hallRequired" && item !== "roomRequired").map((item) => <Box fontSize={13} marginLeft={2} sx={{color: "text.main"}}> { terms[item] + "  :  " + (item === "startDateTime" || item === "endDateTime"? moment(hall[item], "DD-MM-YYYY HH:mm:ss").format("DD MMM YYYY HH:mm A") : hall[item])}</Box>)}
                    </Box>
                  </CustomCollapsible>
                )
              }  
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