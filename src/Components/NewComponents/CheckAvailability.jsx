import React from 'react'
import { DateTimeInput } from './InteractionFields';
import { Box, Button, Divider, Grid, List, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import { Done } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const CheckAvailability = ({...props}) => {

    const startDateTime = props.startDateTimeData.value;
    const endDateTime = props.endDateTimeData.value;

    const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);

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
        const res = await axios.get("/seminar/checkAvailability", {params: {startDate: moment(startDateTime.toString()).format("YYYY-MM-DD"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD"), startTime: moment(startDateTime.toString()).format("HH:mm:ss"), endTime: moment(endDateTime.toString()).format("HH:mm:ss")}});
        console.log(res);
        setIsAvailabilityLoading(false);
        props.setIsAvailabilityChecked(true);
        props.setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
      }

  return (
    <>
        <DateTimeInput label={props.startDateTimeData.label} value={startDateTime} setValue={props.startDateTimeData.setValue} />
        <DateTimeInput label={props.endDateTimeData.label} value={endDateTime} setValue={props.endDateTimeData.setValue} />

        <Button variant="contained" sx={{width:"300px", height: "40px", mb: '1rem', mx: {xs: 0, md: "200px"}}} onClick={handleCheckAvailability} color={props.isAvailabilityChecked? "success" : "primary"} >{isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : props.isAvailabilityChecked ? <Done/> : <>Check Availability</>  }</Button>

      {props.isAvailabilityChecked && 
      <Grid container spacing={2} sx={{textAlign: "center", backgroundColor: "secondary.main",  width: {xs:"400px", md:"720px"}, borderRadius: "10px", ml: {xs:0,md:1}}}>
        <Grid item xs={12} md={6} >
          <Typography variant="h6" component="div" >
            Available
          </Typography>
          <Box>
            <List>
              {
                isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} />  :
               (props.unavailableHalls.length === props.allHalls.length ? <ListItemText primary={"None"} />  : props.allHalls.filter(hall => !props.unavailableHalls.includes(hall)).map((hall) => <ListItemText primary={hall} />))
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
              {props.unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : props.unavailableHalls.map((hall) => <ListItemText primary={hall}/>)}  
            </List>
          </Box>
        </Grid>
      </Grid>
      }
    </>
  )
}

export default CheckAvailability;