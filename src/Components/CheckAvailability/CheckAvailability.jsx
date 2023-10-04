import React, { useContext, useEffect, useState } from 'react'
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


const CheckAvailability = ({ ...props }) => {

  const { terms, isAvailabilityLoading, setIsAvailabilityLoading } = useContext(DataContext);
  const target = props.target
  const [unavailableHallsObject, setUnavailableHallsObject] = useState([]);
  const [formType, setFormType] = useState('Seminar Hall');

  let {
    isAvailabilityChecked,
    setIsAvailabilityChecked,
    unavailableHalls,
    setUnavailableHalls,
    allHalls, 
    hallCategory,
    setHallCategory
  } = useContext(SeminarContext);

  const hallKeys = Object.keys(allHalls);

  allHalls = hallCategory === "Guest House"? [] : allHalls[hallCategory].map(hall => hall.name);
  
  useEffect(()=> {
    setFormType(hallCategory === "Guest House" ? "Guest House": "Seminar Hall");
  }, [hallCategory]);


  const {
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

  if (formType === "Guest House" || target === "guesthouse") {
    isAvailabilityChecked = isGuestHouseAvailabilityChecked;
    setIsAvailabilityChecked = setIsGuestHouseAvailabilityChecked;
    unavailableHalls = unavailableGuestHouses;
    setUnavailableHalls = setUnavailableGuestHouses;
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
    if (!startDateTime || !endDateTime) {
      toast.warn("Please select a start and end time");
      return;
    }
    if (!moment(startDateTime.toString()).isSameOrBefore(endDateTime.toString())) {
      toast.error('Start date & time should be same or before End date & Time');
      return;
    }

    if (!moment(endDateTime.toString()).isAfter(moment(startDateTime.toString()), 'hour')) {
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }
    if (!isWithinNextTwoMonths(startDateTime) || !isWithinNextTwoMonths(endDateTime)) {
      toast.info('You can only book Halls within next months');
      return;
    }

    setIsAvailabilityLoading(true);
    const res = await axios.get((target === "guesthouse" || formType === "Guest House" ? "/guesthouse/checkAvailability" : "/seminar/checkAvailability") + "", { params: { startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), endDateTime: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss") } });
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    console.log("date time", startDateTime, endDateTime);
    console.log("res", res.data)
    setUnavailableHalls(target === "guesthouse" || formType === "Guest House" ? res.data?.overlappingGuestHouses?.map(gh => gh.roomRequired) : res.data?.overlappingSeminarHalls?.filter(hall => hall.category === hallCategory).map(seminar => seminar.hallRequired));
    setUnavailableHallsObject(target === "guesthouse" || formType === "Guest House" ? res.data?.overlappingGuestHouses : res.data?.overlappingSeminarHalls?.filter(hall => hall.category === hallCategory));
  }

  const handleProceed = () => {
    setSelectedView("Book");
    setSelectedForm(formType);
    setIsAvailabilityChecked(false)
  }

  return (
    <>
    {console.log('allHalls', hallKeys)}
      {!target &&
        <Box marginX={"100px"}>
          <Selector
            list={[
              ...hallKeys.map((hall) => ({ name: hall })),
              { name: "Guest House" },
            ]}
            value={hallCategory}
            setValue={setHallCategory}
            setIsAvailabilityChecked={setIsAvailabilityChecked}
          />
        </Box>
      }
      <DateTimeInput label="Start Date & Time *" value={startDateTime} setValue={setStartDateTime} unCheck={setIsAvailabilityChecked} />
      <DateTimeInput label="End Date & Time *" value={endDateTime} setValue={setEndDateTime} unCheck={setIsAvailabilityChecked} />

      <Button variant="contained" sx={{ width: "300px", height: "40px", mb: '1rem', mx: { xs: 0, md: "200px" } }} onClick={handleCheckAvailability} color={isAvailabilityChecked ? "success" : "primary"} >{isAvailabilityLoading ? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done /> : <>Check Availability</>}</Button>

      { isAvailabilityChecked && 
      <Grid container spacing={2} sx={{textAlign: "", mx: 'auto', backgroundColor: "secondary.main",  width: {xs:"400px", md:"750px"}, borderRadius: "10px", maxHeight: {md: "365px"}, overflow: "auto"}}>
        <Grid item xs={12} md={6} >
          <Typography variant="h6" component="div" sx={{textAlign: "center"}} >
            Available
          </Typography>
          <Box >
            <List sx={{mr: '15px'}}>
              {
                isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} />  :
                (unavailableHalls.length === allHalls.length ? <ListItemText primary={"None"} />  : allHalls.filter(hall => !unavailableHalls.includes(hall)).map((hall, index) => <ListItemText key={hall} primary={hall} sx={{backgroundColor: '#fef08a', pl: '5px', borderRadius: '5px'}} />)) 
              }
            </List>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={5}>
          <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
            Not Available
          </Typography>
          <Box>
            <List sx={{width: "325px"}}>
              {
                unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : 
                unavailableHallsObject.map((hall) => 
                  <CustomCollapsible title={target === "guesthouse" || formType === "Guest House" ? hall.roomRequired : hall.hallRequired} backgroundColor="#e5e9ec" isAvailability={true}>
                    <Box sx={{textAlign: "left"}}>
                      {Object.keys(hall).filter((item) => item !== "hallRequired" && item !== "roomRequired").map((item) => <Box fontSize={13} sx={{color: "text.main"}}> { terms[item] + "  :  "} <strong>{ (item === "startDateTime" || item === "endDateTime"? moment(hall[item], "YYYY-MM-DD HH:mm:ss").format("DD MMM YYYY hh:mm A") : hall[item]) }</strong></Box>)}
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
          <Button variant="contained" sx={{ width: "200px", height: "40px", mx: "auto" }} onClick={handleProceed} disabled={!isAvailabilityChecked} endIcon={<Send />}>Proceed</Button>
        </Box>
      }
    </>
  )
}

export default CheckAvailability;